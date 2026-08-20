import { pool } from '../db.js';
import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const migrate = async () => {
    const args = process.argv.slice(2);
    const command = args[0] || 'up';
    const targetFile = args[1]; // optional: run only one file

    try {
        if (command === 'up') {
            console.log('Ejecutando migraciones (up)...');

            // Create migrations tracking table
            await pool.query(`
                CREATE TABLE IF NOT EXISTS _migrations (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    archivo VARCHAR(255) NOT NULL UNIQUE,
                    ejecutado_en DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);

            const [executed] = await pool.query('SELECT archivo FROM _migrations ORDER BY id');
            const executedSet = new Set(executed.map(r => r.archivo));

            const files = (await readdir(__dirname))
                .filter(f => f.endsWith('.js') && f !== 'run.js')
                .sort();

            for (const file of files) {
                if (targetFile && file !== targetFile) continue;

                if (executedSet.has(file)) {
                    console.log(`  SKIP  ${file} (ya ejecutado)`);
                    continue;
                }

                const mod = await import(`./${file}`);
                const migration = mod.default || mod;
                await migration.up(pool);
                await pool.query('INSERT INTO _migrations (archivo) VALUES (?)', [file]);
                console.log(`  OK    ${file}`);
            }

            console.log('Migraciones completadas.');
        } else if (command === 'down') {
            console.log('Revirtiendo última migración (down)...');

            const [last] = await pool.query('SELECT archivo FROM _migrations ORDER BY id DESC LIMIT 1');
            if (last.length === 0) {
                console.log('No hay migraciones que revertir.');
                await pool.end();
                return;
            }

            const file = last[0].archivo;
            const mod = await import(`./${file}`);
            const migration = mod.default || mod;
            await migration.down(pool);
            await pool.query('DELETE FROM _migrations WHERE archivo = ?', [file]);
            console.log(`  OK    ${file} revertido`);

        } else if (command === 'reset') {
            console.log('Reseteando todas las migraciones...');
            const files = (await readdir(__dirname))
                .filter(f => f.endsWith('.js') && f !== 'run.js')
                .sort()
                .reverse();

            for (const file of files) {
                try {
                    const mod = await import(`./${file}`);
                    const migration = mod.default || mod;
                    await migration.down(pool);
                    console.log(`  OK    ${file} revertido`);
                } catch {
                    console.log(`  SKIP  ${file} (tabla no existe)`);
                }
            }
            await pool.query('DROP TABLE IF EXISTS _migrations');
            console.log('Reset completado.');

        } else if (command === 'status') {
            console.log('Estado de migraciones:');
            await pool.query(`
                CREATE TABLE IF NOT EXISTS _migrations (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    archivo VARCHAR(255) NOT NULL UNIQUE,
                    ejecutado_en DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);

            const [executed] = await pool.query('SELECT archivo, ejecutado_en FROM _migrations ORDER BY id');
            const executedSet = new Set(executed.map(r => r.archivo));

            const files = (await readdir(__dirname))
                .filter(f => f.endsWith('.js') && f !== 'run.js')
                .sort();

            for (const file of files) {
                if (executedSet.has(file)) {
                    const row = executed.find(r => r.archivo === file);
                    console.log(`  [OK]  ${file}  (${row.ejecutado_en})`);
                } else {
                    console.log(`  [..]  ${file}  (pendiente)`);
                }
            }
        }

    } catch (error) {
        console.error('Error en migración:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
};

migrate();
