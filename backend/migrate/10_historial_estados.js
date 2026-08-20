export default {
    up: async (pool) => {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS historial_estados (
                idHistorial INT AUTO_INCREMENT PRIMARY KEY,
                idReporte INT NOT NULL,
                estadoAnterior VARCHAR(50),
                estadoNuevo VARCHAR(50) NOT NULL,
                idAdmin INT,
                observaciones TEXT,
                fechaCambio DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (idReporte) REFERENCES reportes(idReporte) ON DELETE CASCADE,
                FOREIGN KEY (idAdmin) REFERENCES admins(idAdmin) ON DELETE SET NULL
            )
        `);
    },
    down: async (pool) => {
        await pool.query('DROP TABLE IF EXISTS historial_estados');
    }
};
