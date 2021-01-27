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

/*
@desc    Switch paid
@route   POST /api/orders/:id/pay
@ access Private
*/
export const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()

        //comes from PayPal
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }
    else {
        res.status(404)
        throw new Error('Order Not Found')
    }

})


/*
@desc    Get user(logged in) orders
@route   GET /api/orders/myorders
@ access Private
*/
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)

})