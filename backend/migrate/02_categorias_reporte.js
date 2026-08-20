export default {
    up: async (pool) => {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS categorias_reporte (
                idCategoria INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                icono VARCHAR(50),
                descripcion TEXT
            )
        `);
    },
    down: async (pool) => {
        await pool.query('DROP TABLE IF EXISTS categorias_reporte');
    }
};
