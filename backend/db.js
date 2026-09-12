import { createPool } from 'mysql2/promise'

// FIX: Soporta ambos entornos - sin contraseña (otras PCs) y con contraseña '1234' (esta PC/XAMPP)
// Usa variable de entorno DB_PASSWORD si existe, si no prueba '' y luego '1234' automáticamente
// Esto evita el 500 "ER_ACCESS_DENIED_ERROR" que rompía /capt/* y /auth/*
const dbConfigBase = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    database: process.env.DB_NAME || 'proyect-uni',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

// Intenta con password de env o '' primero
let _password = process.env.DB_PASSWORD ?? '';
let pool = createPool({ ...dbConfigBase, password: _password });

// FIX: Auto-fallback si el password '' falla (ER_ACCESS_DENIED_ERROR) -> reintenta con '1234'
// Top-level await funciona en ESM (type: module)
try {
    await pool.query('SELECT 1');
} catch (e) {
    if (e.code === 'ER_ACCESS_DENIED_ERROR' && _password === '') {
        console.warn('[DB] Access denied con password vacío, reintentando con "1234"...');
        pool = createPool({ ...dbConfigBase, password: '1234' });
        // Verifica de nuevo
        await pool.query('SELECT 1');
        console.log('[DB] Conectado con password "1234"');
    } else if (e.code === 'ER_BAD_DB_ERROR') {
        // Base no existe -> la crea automáticamente (para que funcione en otra PC sin crearla a mano)
        console.warn('[DB] Base proyect-uni no existe, creándola...');
        const tmpPool = createPool({ ...dbConfigBase, password: _password, database: undefined });
        try {
            await tmpPool.query('CREATE DATABASE IF NOT EXISTS `proyect-uni` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
            console.log('[DB] Base creada, reconectando...');
        } catch (e2) {
            // Si falló con '', prueba con 1234
            if (e2.code === 'ER_ACCESS_DENIED_ERROR' && _password === '') {
                const tmpPool2 = createPool({ ...dbConfigBase, password: '1234', database: undefined });
                await tmpPool2.query('CREATE DATABASE IF NOT EXISTS `proyect-uni` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
                pool = createPool({ ...dbConfigBase, password: '1234' });
                console.log('[DB] Base creada con password 1234');
                await tmpPool2.end();
            } else throw e2;
        }
        await tmpPool.end();
        // Reconecta a la base ya creada
        if (pool) await pool.query('SELECT 1');
    } else {
        console.error('[DB] Error de conexión:', e.code, e.message);
        throw e;
    }
}

export { pool };