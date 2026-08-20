import { pool } from "../db.js";

export const captAdmins = async (req, res) => {
    try {
        const [admins] = await pool.query('SELECT idAdmin, nomAdmin, apeAdmin, dniAdmin, correoAdmin, bornAdmin, celAdmin, typeAdmin FROM admins');
        res.json(admins);
    } catch (error) {
        console.error('Error al obtener nombres de administradores:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const captUsers = async (req, res) => {
    try {
        const [users] = await pool.query('SELECT idUser, nomUser, apeUser, dniUser, correoUser, bornUser, celUser FROM usuarios');
        res.json(users);
        //console.log(users)
    } catch (error) {
        console.error('Error al obtener nombres de usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const captNoticias = async (req, res) => {
    try {
        const [noticias] = await pool.query(
            `SELECT idNoticia, titulo, descripcion, imagen, link, linkTexto,
                    fechaCreacion
             FROM noticias
             WHERE activa = TRUE
             ORDER BY fechaCreacion DESC, idNoticia DESC`
        );
        res.json(noticias);
    } catch (error) {
        console.error('Error al obtener noticias:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const captReportes = async (req, res) => {
    try {
        const [reportes] = await pool.query(
            `SELECT r.idReporte, r.titulo, r.descripcion, r.ubicacion,
                    r.latitud, r.longitud, r.evidencia, r.estado,
                    r.fechaCreacion, m.nombre AS municipalidad,
                    c.nombre AS categoria
             FROM reportes r
             INNER JOIN municipalidades m ON m.idMunicipalidad = r.idMunicipalidad
             INNER JOIN categorias_reporte c ON c.idCategoria = r.idCategoria
             WHERE m.slug = ?
             ORDER BY r.fechaCreacion DESC, r.idReporte DESC`,
            [req.params.slug]
        );
        res.json(reportes);
    } catch (error) {
        console.error('Error al obtener reportes:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const captDestacados = async (req, res) => {
    try {
        const [destacados] = await pool.query(
            `SELECT idDestacado, titulo, descripcion, imagen, link, linkTexto,
                    fechaCreacion
             FROM destacados
             WHERE activo = TRUE
             ORDER BY fechaCreacion DESC, idDestacado DESC`
        );
        res.json(destacados);
    } catch (error) {
        console.error('Error al obtener destacados:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const captPreguntas = async (req, res) => {
    try {
        const [preguntas] = await pool.query(
            `SELECT idPregunta, pregunta, respuesta, orden
             FROM preguntas_frecuentes
             WHERE activa = TRUE
             ORDER BY orden ASC, idPregunta ASC`
        );
        res.json(preguntas);
    } catch (error) {
        console.error('Error al obtener preguntas frecuentes:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const captSlider = async (req, res) => {
    try {
        const [imagenes] = await pool.query(
            `SELECT idImagen, titulo, imagen
             FROM slider_imagenes
             WHERE seccion = ? AND activa = TRUE
             ORDER BY orden ASC, idImagen ASC`,
            [req.params.seccion]
        );
        res.json(imagenes);
    } catch (error) {
        console.error('Error al obtener imágenes del slider:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
