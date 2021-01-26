import axios from 'axios'
import {
    ORDER_CREATE_ERR, ORDER_CREATE_REQ, ORDER_CREATE_SUCCESS,
    ORDER_INFO_ERR, ORDER_INFO_SUCCESS, ORDER_INFO_REQ
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