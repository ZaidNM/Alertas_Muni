import { Router } from 'express';
import { createReporte, getMunicipalidades, getCategorias, getReportesByUser } from '../controllers/reporte.controller.js';

const router = Router();

// FIX: Endpoints para formulario con geolocalización del dispositivo
router.get('/reportes/municipalidades', getMunicipalidades); // para <select> municipalidad
router.get('/reportes/categorias', getCategorias); // para <select> categoría
router.post('/reportes', createReporte); // guarda reporte con lat/lng del dispositivo
router.get('/reportes/user/:idUser', getReportesByUser);

export default router;
