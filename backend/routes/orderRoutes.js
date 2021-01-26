import express from 'express'
import { auth } from '../middleware/auth.js'
import { createOrder, getOrder, updateOrderToPaid, getMyOrders } from '../handlers/orderRoutesHandlers.js'

const router = express.Router()

router.route('/').post(auth, createOrder)
router.route('/myorders').post(auth, getMyOrders)
router.route('/:id').get(auth, getOrder)
router.route('/:id/pay').put(auth, updateOrderToPaid)

export default router