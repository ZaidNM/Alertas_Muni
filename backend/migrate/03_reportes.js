export default {
    up: async (pool) => {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS reportes (
                idReporte INT AUTO_INCREMENT PRIMARY KEY,
                idUser INT NOT NULL,
                idMunicipalidad INT NOT NULL,
                idCategoria INT NOT NULL,
                titulo VARCHAR(200) NOT NULL,
                descripcion TEXT NOT NULL,
                ubicacion VARCHAR(500),
                latitud DECIMAL(10, 8),
                longitud DECIMAL(11, 8),
                evidencia VARCHAR(500),
                estado VARCHAR(50) DEFAULT 'pendiente',
                fechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP,
                fechaActualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (idUser) REFERENCES usuarios(idUser) ON DELETE CASCADE,
                FOREIGN KEY (idMunicipalidad) REFERENCES municipalidades(idMunicipalidad),
                FOREIGN KEY (idCategoria) REFERENCES categorias_reporte(idCategoria)
            )
        `);
    },
    down: async (pool) => {
        await pool.query('DROP TABLE IF EXISTS reportes');
    }
};
