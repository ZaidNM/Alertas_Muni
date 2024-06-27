import { Router } from 'express'
import { getUser, getUsers, createUser, updateUser, deleteUser } from '../controllers/user.controller.js';


const router = Router()

router.get('/users/:id', getUser);

router.get('/users', getUsers);

router.post('/users', createUser);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);


export default router;