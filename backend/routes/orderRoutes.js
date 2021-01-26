import express from 'express'
import { auth } from '../middleware/auth.js'
import { createOrder, getOrder } from '../handlers/orderRoutesHandlers.js'

const router = express.Router()

router.route('/').post(auth, createOrder)
router.route('/:id').get(auth, getOrder)


export default router