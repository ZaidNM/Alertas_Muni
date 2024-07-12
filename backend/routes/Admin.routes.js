import { Router } from 'express'
import { getAdmin, getAdmins, createAdmin, updateAdmin, deleteAdmin } from '../controllers/Admin.controller.js';


const router = Router()

router.get('/admins/:id', getAdmin);

router.get('/admins', getAdmins);

router.post('/admins', createAdmin);

router.put('/admins/:id', updateAdmin);

router.delete('/admins/:id', deleteAdmin);


export default router;