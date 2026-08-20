export default {
    up: async (pool) => {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS comentarios (
                idComentario INT AUTO_INCREMENT PRIMARY KEY,
                idUser INT NOT NULL,
                idReporte INT,
                idNoticia INT,
                contenido TEXT NOT NULL,
                activo BOOLEAN DEFAULT TRUE,
                fechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (idUser) REFERENCES usuarios(idUser) ON DELETE CASCADE,
                FOREIGN KEY (idReporte) REFERENCES reportes(idReporte) ON DELETE CASCADE,
                FOREIGN KEY (idNoticia) REFERENCES noticias(idNoticia) ON DELETE CASCADE
            )
        `);
    },
    down: async (pool) => {
        await pool.query('DROP TABLE IF EXISTS comentarios');
    }
};
