import express from 'express'
import { auth } from '../middleware/auth.js'
import { createOrder, getOrder, updateOrderToPaid } from '../handlers/orderRoutesHandlers.js'

const router = express.Router()

router.route('/').post(auth, createOrder)
router.route('/:id').get(auth, getOrder)
router.route('/:id/pay').put(auth, updateOrderToPaid)

export default router