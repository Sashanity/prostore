import express from 'express'
import { auth } from '../middleware/auth.js'
import { adminAuth } from '../middleware/adminAuth.js'
import { createOrder, getOrder, updateOrderToPaid, getMyOrders } from '../handlers/orderRoutesHandlers.js'
import { getAllOrders, updateOrderOutForDelivery } from '../handlers/adminAccessRoutesHandlers/adminOrdersRoutesHandlers.js'

const router = express.Router()

router.route('/')
    .post(auth, createOrder)
    .get(auth, adminAuth, getAllOrders)
router.route('/myorders').get(auth, getMyOrders)
router.route('/:id').get(auth, getOrder)
router.route('/:id/pay').put(auth, updateOrderToPaid)
router.route('/:id/deliver').put(auth, adminAuth, updateOrderOutForDelivery)

export default router