import {Router} from 'express';
import{captAdmins,captUsers} from '../controllers/capt.controller.js';

const router=Router()

router.get('/capt/admin', captAdmins)
router.get('/capt/users', captUsers)


export default router;