import {
    ORDER_CREATE_ERR, ORDER_CREATE_REQ, ORDER_CREATE_SUCCESS,
    ORDER_INFO_ERR, ORDER_INFO_SUCCESS, ORDER_INFO_REQ, ORDER_PAY_SUCCESS, ORDER_PAY_REQ, ORDER_PAY_ERR, ORDER_PAY_RESET
} from '../consts/orderConsts'

export const createOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload }
        case ORDER_CREATE_REQ:
            return { loading: true }
        case ORDER_CREATE_ERR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const orderInfoReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_INFO_REQ:
            return {
                ...state,
                loading: true,
            }
        case ORDER_INFO_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            }
        case ORDER_INFO_ERR:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const updateOrderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_SUCCESS:
            return { loading: false, success: true }
        case ORDER_PAY_REQ:
            return { loading: true }
        case ORDER_PAY_ERR:
            return { loading: false, error: action.payload }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
}