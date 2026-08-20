export default {
    up: async (pool) => {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS destacados (
                idDestacado INT AUTO_INCREMENT PRIMARY KEY,
                titulo VARCHAR(200) NOT NULL,
                descripcion TEXT NOT NULL,
                imagen VARCHAR(255),
                link VARCHAR(500),
                linkTexto VARCHAR(100),
                idMunicipalidad INT,
                activo BOOLEAN DEFAULT TRUE,
                fechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (idMunicipalidad) REFERENCES municipalidades(idMunicipalidad) ON DELETE SET NULL
            )
        `);
    },
    down: async (pool) => {
        await pool.query('DROP TABLE IF NOT EXISTS destacados');
    }
};
