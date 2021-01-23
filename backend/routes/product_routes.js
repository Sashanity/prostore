import express from 'express'
import { getProducts, getProduct } from '../handlers/productRoutesHandlers.js'

const router = express.Router()

// router.get('/', getProducts)
// can use roue instead vv
router.route('/').get(getProducts)
router.route('/:id').get(getProduct)

export default router