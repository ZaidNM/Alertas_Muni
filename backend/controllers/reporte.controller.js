import { pool } from "../db.js";

// FIX: Obtener municipalidades y categorías para poblar selects del formulario
export const getMunicipalidades = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT idMunicipalidad, nombre, slug FROM municipalidades ORDER BY nombre');
        res.json(rows);
    } catch (e) {
        console.error('Error municipalidades', e);
        res.status(500).json({ message: 'Error al obtener municipalidades' });
    }
};

export const getCategorias = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT idCategoria, nombre FROM categorias_reporte ORDER BY idCategoria');
        res.json(rows);
    } catch (e) {
        console.error('Error categorias', e);
        res.status(500).json({ message: 'Error al obtener categorías' });
    }
};

// FIX: Crear reporte con ubicación del dispositivo (lat/lng tomados vía navigator.geolocation en frontend)
// Nota: "La ubicación será tomada del dispositivo donde usted envía el formulario"
export const createReporte = async (req, res) => {
    try {
        const { idUser, idMunicipalidad, idCategoria, titulo, descripcion, latitud, longitud, evidencia } = req.body;

        if (!titulo || !descripcion || !idMunicipalidad || !idCategoria) {
            return res.status(400).json({ message: 'Faltan campos obligatorios (titulo, descripcion, municipalidad, categoria)' });
        }
        // idUser puede venir del frontend (login) o default 1 si no está logueado (para pruebas)
        const userId = idUser || 1;

        // Si hay lat/lng, genera link de Google Maps
        let ubicacion = null;
        if (latitud != null && longitud != null) {
            ubicacion = `https://maps.google.com/?q=${latitud},${longitud}`;
        } else if (req.body.ubicacion) {
            ubicacion = req.body.ubicacion;
        }

        const [result] = await pool.query(
            `INSERT INTO reportes (idUser, idMunicipalidad, idCategoria, titulo, descripcion, ubicacion, latitud, longitud, evidencia, estado)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pendiente')`,
            [userId, idMunicipalidad, idCategoria, titulo, descripcion, ubicacion, latitud || null, longitud || null, evidencia || null]
        );

        res.status(201).json({ message: 'Reporte creado', idReporte: result.insertId, ubicacion, latitud, longitud });
    } catch (e) {
        console.error('Error createReporte', e);
        // Si falta columna evidencia o tabla, da 500 con detalle
        res.status(500).json({ message: 'Error al crear reporte', error: e.message });
    }
};

// Opcional: listar reportes del usuario
export const getReportesByUser = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT r.*, m.nombre as municipalidad, c.nombre as categoria FROM reportes r
             JOIN municipalidades m ON m.idMunicipalidad=r.idMunicipalidad
             JOIN categorias_reporte c ON c.idCategoria=r.idCategoria
             WHERE r.idUser=? ORDER BY r.fechaCreacion DESC`, [req.params.idUser]
        );
        res.json(rows);
    } catch (e) {
        res.status(500).json({ message: 'Error al listar reportes' });
    }
};
