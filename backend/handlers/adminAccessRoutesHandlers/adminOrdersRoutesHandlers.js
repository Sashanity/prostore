import asyncHandler from 'express-async-handler' // usefult instead of trycatch blocks
import Order from '../../models/orderModel.js'

/*
@desc    Get all orders 
@route   GET /api//orders/
@ access Admin,Private
*/
export const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({})
    res.json(orders)

})

/*
@desc    update order for delivery
@route   POST /api/orders/:id/deliver
@ access Private
*/
export const updateOrderOutForDelivery = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        // when it was set by admin to deliver 
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }
    else {
        res.status(404)
        throw new Error('Order Not Found')
    }

})
