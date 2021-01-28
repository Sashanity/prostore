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