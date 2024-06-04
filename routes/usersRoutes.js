import UserController from '../controllers/UsersController.js'
import express from 'express'


const router=express.Router();

router.get('/', UserController.getUsers)

router.get('/:id', UserController.getUserById)

router.post('/', UserController.addUser)

router.put('/:id', UserController.updateUser)

router.delete('/:id', UserController.deleteUser)

export default router;