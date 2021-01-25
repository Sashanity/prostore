import asyncHandler from 'express-async-handler' // usefult instead of trycatch blocks
import Order from '../models/orderModel.js'


/*
@desc    Create order
@route   GET /api/orders
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