import {Router} from 'express';
import { captAdmins, captUsers, captNoticias, captReportes, captDestacados, captPreguntas, captSlider } from '../controllers/capt.controller.js';

const router=Router()

router.get('/capt/admin', captAdmins)
router.get('/capt/users', captUsers)
router.get('/capt/noticias', captNoticias)
router.get('/capt/reportes/:slug', captReportes)
router.get('/capt/destacados', captDestacados)
router.get('/capt/preguntas', captPreguntas)
router.get('/capt/slider/:seccion', captSlider)


export default router;