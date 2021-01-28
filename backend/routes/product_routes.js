import express from 'express'
import { getProducts, getProduct } from '../handlers/productRoutesHandlers.js'
import { deleteProductById } from '../handlers/adminAccessRoutesHandlers/adminProductsRoutesHandlers.js'
import { auth } from '../middleware/auth.js'
import { adminAuth } from '../middleware/adminAuth.js'

const router = express.Router()

// router.get('/', getProducts)
// can use routse instead vv
router.route('/').get(getProducts)
router.route('/:id')
    .get(getProduct)
    .delete(auth, adminAuth, deleteProductById)

export default router