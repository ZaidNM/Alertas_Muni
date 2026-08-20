export default {
    up: async (pool) => {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS slider_imagenes (
                idImagen INT AUTO_INCREMENT PRIMARY KEY,
                titulo VARCHAR(200),
                imagen VARCHAR(255) NOT NULL,
                seccion VARCHAR(50) NOT NULL,
                orden INT DEFAULT 0,
                activa BOOLEAN DEFAULT TRUE
            )
        `);
    },
    down: async (pool) => {
        await pool.query('DROP TABLE IF EXISTS slider_imagenes');
    }
};
