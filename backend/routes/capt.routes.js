import {Router} from 'express';
// FIX MAPA: Se importa captReportesMapa para exponer todos los reportes geolocalizados al admin
import { captAdmins, captUsers, captNoticias, captReportes, captDestacados, captPreguntas, captSlider, captReportesMapa } from '../controllers/capt.controller.js';

const router=Router()

router.get('/capt/admin', captAdmins)
router.get('/capt/users', captUsers)
router.get('/capt/noticias', captNoticias)
// FIX MAPA: Ruta GET /capt/reportes/mapa - ¡debe ir ANTES de /:slug para que "mapa" no sea tomado como slug!
// Devuelve JSON con todos los reportes con lat/lng para pinchar en Leaflet en el panel admin
router.get('/capt/reportes/mapa', captReportesMapa)
router.get('/capt/reportes/:slug', captReportes)
router.get('/capt/destacados', captDestacados)
router.get('/capt/preguntas', captPreguntas)
router.get('/capt/slider/:seccion', captSlider)


export default router;