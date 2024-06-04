import express from 'express'
import LinkController from '../controllers/LinksController.js'

const router=express.Router();

router.get('/',LinkController.getList)

router.get('/:id',LinkController.redirectLink)

router.get('/:id/clicks',LinkController.getClickStatus)

router.post('/',LinkController.add)

router.put('/:id', LinkController.update)

router.delete('/:id', LinkController.delete)
export default router;