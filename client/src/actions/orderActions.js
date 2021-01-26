import axios from 'axios'
import {
    ORDER_CREATE_ERR, ORDER_CREATE_REQ, ORDER_CREATE_SUCCESS,
    ORDER_INFO_ERR, ORDER_INFO_SUCCESS, ORDER_INFO_REQ, ORDER_PAY_ERR, ORDER_PAY_SUCCESS, ORDER_PAY_REQ, ORDER_LIST_REQ, ORDER_LIST_ERR, ORDER_LIST_SUCCESS
} from '../consts/orderConsts'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQ })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/orders`, order, config)
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getOrderInfo = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_INFO_REQ })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/${id}`, config)
        dispatch({ type: ORDER_INFO_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: ORDER_INFO_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const orderPay = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQ })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, config)
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: ORDER_PAY_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQ })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/myorders`, config)
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: ORDER_LIST_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}



