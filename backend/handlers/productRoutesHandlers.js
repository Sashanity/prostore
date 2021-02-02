import asyncHandler from 'express-async-handler' // usefult instead of trycatch blocks
import Product from '../models/productModel.js'


/*
@desc    Fetch all products
@route   GET /api/products
@ access Public
*/
export const getProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i' // case insensetive
            }
        }
        : {}

    const page = Number(req.query.pageNum) || 1
    const pageSize = 4

    const countProducts = Product.countDocuments({ ...keyword })
    // find products
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
    // throw new Error('Some Error')
    res.json({ products, page, pages: Math.ceil(countProducts / pageSize) })
})

/*
@desc    Fetch single product by id
@route   GET /api/products/:id
@ access Public
*/
export const getProduct = asyncHandler(async (req, res) => {
    // const product = products.find(p => p._id === req.params.id)
    const product = await Product.findById(req.params.id)
    product ? res.json(product) : res.status(404).json({ message: 'Product Not Found' })

})

/*
@desc    Add a review
@route   POST /api/products/:id/ reviews
@ access Private 
*/
export const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        const isReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString())

        if (isReviewed) {
            res.status(400)
            throw new Error('Already reviewed by this user!')
        }

        const newReview = {
            name: req.user.name,
            rating: Number(req.body.rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(newReview)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        //save to db
        await product.save()
        res.status(201).json({ message: 'Review is added' })

    } else {
        res.status(404)
        throw new Error('Product not Found')
    }
})