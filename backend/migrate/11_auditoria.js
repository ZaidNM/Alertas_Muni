export default {
    up: async (pool) => {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS auditoria (
                idAuditoria INT AUTO_INCREMENT PRIMARY KEY,
                tabla VARCHAR(50) NOT NULL,
                idRegistro INT NOT NULL,
                accion VARCHAR(50) NOT NULL,
                datosAntes JSON,
                datosDespues JSON,
                idUsuario INT,
                idAdmin INT,
                fechaAccion DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (idUsuario) REFERENCES usuarios(idUser) ON DELETE SET NULL,
                FOREIGN KEY (idAdmin) REFERENCES admins(idAdmin) ON DELETE SET NULL
            )
        `);
    },
    down: async (pool) => {
        await pool.query('DROP TABLE IF EXISTS auditoria');
    }
};
