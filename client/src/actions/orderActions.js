import axios from 'axios'
import { CART_RESET } from '../consts/cartConsts'
import * as constants from '../consts/orderConsts'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: constants.ORDER_CREATE_REQ })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/orders`, order, config)
        dispatch({ type: constants.ORDER_CREATE_SUCCESS, payload: data })
        dispatch({ type: CART_RESET, payload: data })

    } catch (error) {
        dispatch({
            type: constants.ORDER_CREATE_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getOrderInfo = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: constants.ORDER_INFO_REQ })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/${id}`, config)
        dispatch({ type: constants.ORDER_INFO_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: constants.ORDER_INFO_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const orderPay = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: constants.ORDER_PAY_REQ })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, config)
        dispatch({ type: constants.ORDER_PAY_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: constants.ORDER_PAY_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: constants.ORDER_LIST_REQ })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/myorders`, config)
        dispatch({ type: constants.ORDER_LIST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: constants.ORDER_LIST_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


export const getOrdersList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: constants.ORDER_ADMIN_LIST_REQ })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders`, config)
        dispatch({ type: constants.ORDER_ADMIN_LIST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: constants.ORDER_ADMIN_LIST_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const orderDeliver = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: constants.ORDER_DELIVER_REQ })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config)

        dispatch({
            type: constants.ORDER_DELIVER_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: constants.ORDER_DELIVER_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}



