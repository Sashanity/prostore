import express from 'express'
import { getProducts, getProduct, createProductReview } from '../handlers/productRoutesHandlers.js'
import { deleteProductById, createNewProduct, updateProduct } from '../handlers/adminAccessRoutesHandlers/adminProductsRoutesHandlers.js'
import { auth } from '../middleware/auth.js'
import { adminAuth } from '../middleware/adminAuth.js'

const router = express.Router()

// router.get('/', getProducts)
// can use routse instead vv
router.route('/')
    .get(getProducts)
    .post(auth, adminAuth, createNewProduct)

router.route('/:id')
    .get(getProduct)
    .delete(auth, adminAuth, deleteProductById)
    .put(auth, adminAuth, updateProduct)

router.route('/:id/reviews')
    .post(auth, createProductReview)

export default router