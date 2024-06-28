import { Router } from 'express'
import { authenticateUser, authenticateAdmin, authenticateEmails } from '../controllers/verif.controller.js';


const router = Router()

router.post('/auth/user', authenticateUser)
router.post('/auth/admin', authenticateAdmin)
router.get('/auth/admin/emails', authenticateEmails)


export default router;