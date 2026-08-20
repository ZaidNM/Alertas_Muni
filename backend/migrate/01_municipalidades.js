export default {
    up: async (pool) => {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS municipalidades (
                idMunicipalidad INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                slug VARCHAR(100) NOT NULL UNIQUE,
                imagen VARCHAR(255),
                descripcion TEXT
            )
        `);
    },
    down: async (pool) => {
        await pool.query('DROP TABLE IF EXISTS municipalidades');
    }
};
