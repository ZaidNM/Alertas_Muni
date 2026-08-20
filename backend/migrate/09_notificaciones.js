export default {
    up: async (pool) => {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS notificaciones (
                idNotificacion INT AUTO_INCREMENT PRIMARY KEY,
                idUser INT NOT NULL,
                titulo VARCHAR(200) NOT NULL,
                mensaje TEXT NOT NULL,
                leida BOOLEAN DEFAULT FALSE,
                tipo VARCHAR(50),
                referenciaId INT,
                fechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (idUser) REFERENCES usuarios(idUser) ON DELETE CASCADE
            )
        `);
    },
    down: async (pool) => {
        await pool.query('DROP TABLE IF EXISTS notificaciones');
    }
};
