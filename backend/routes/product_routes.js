import express from 'express'
import asyncHandler from 'express-async-handler' // usefult instead of trycatch blocks
import Product from '../models/productModel.js'

const router = express.Router()
/*
@desc    Fetch all products
@route   GET /api/products
@ access Public
*/
router.get('/', asyncHandler(async (req, res) => {
    // find all products
    const products = await Product.find({})
    // throw new Error('Some Error')
    res.json(products)
}))

/*
@desc    Fetch single product by id
@route   GET /api/products/:id
@ access Public
*/
router.get('/:id', asyncHandler(async (req, res) => {
    // const product = products.find(p => p._id === req.params.id)
    const product = await Product.findById(req.params.id)
    product ? res.json(product) : res.status(404).json({ message: 'Product Not Found' })

}))
export default router