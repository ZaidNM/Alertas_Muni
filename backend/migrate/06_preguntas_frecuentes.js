export default {
    up: async (pool) => {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS preguntas_frecuentes (
                idPregunta INT AUTO_INCREMENT PRIMARY KEY,
                pregunta VARCHAR(500) NOT NULL,
                respuesta TEXT NOT NULL,
                orden INT DEFAULT 0,
                activa BOOLEAN DEFAULT TRUE
            )
        `);
    },
    down: async (pool) => {
        await pool.query('DROP TABLE IF NOT EXISTS preguntas_frecuentes');
    }
};
