import asyncHandler from 'express-async-handler' // usefult instead of trycatch blocks
import Product from '../../models/productModel.js'

/*
@desc    ADMIN Delete product
@route   Delete /api/product/:id
@ access Private, Admin
*/
export const deleteProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({ message: 'Product deleted successfully' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

/*
@desc    ADMIN Create product
@route   POST /api/products
@ access Private, Admin
*/
export const createNewProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Default name',
        price: 0,
        user: req.user._id, // admin id
        image: '/images/default-image-png-8.png',
        brand: 'Default brand',
        category: 'Default category',
        countInStock: 0,
        numReviews: 0,
        description: 'Default description',
    })

    const productCreated = await product.save()
    res.status(201).json(productCreated)

})

/*
@desc    ADMIN update product
@route   PUT /api/products/:id
@ access Private, Admin
*/
export const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = req.body.name || product.name
        product.price = req.body.price || product.price
        product.description = req.body.description || product.description
        product.image = req.body.image || product.image
        product.brand = req.body.brand || product.brand
        product.category = req.body.category || product.category
        product.countInStock = req.body.countInStock || product.countInStock

        const productUpdated = await product.save()
        res.status(201).json(productUpdated)
    } else {
        res.status(404)
        throw new Error('Product not Found')
    }
})