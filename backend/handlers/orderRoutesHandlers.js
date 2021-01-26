import asyncHandler from 'express-async-handler' // usefult instead of trycatch blocks
import Order from '../models/orderModel.js'


/*
@desc    Create order
@route   POST /api/orders
@ access Private
*/
export const createOrder = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body

    // check empty order
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        })

        //save to db
        const orderCreated = await order.save()

        res.status(201).json(orderCreated)
    }
})

/*
@desc    Get order by ID
@route   GET /api/orders/:id
@ access Private
*/
export const getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    // order ? res.json(order) : (res.status(404).json({ message: 'Order Not Found' }))
    if (order) {
        res.json(order)
    }
    else {
        res.status(404)
        throw new Error('Order Not Found')
    }

})