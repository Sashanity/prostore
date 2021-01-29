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
