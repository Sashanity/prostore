import * as constants from '../consts/orderConsts'

export const createOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload }
        case constants.ORDER_CREATE_REQ:
            return { loading: true }
        case constants.ORDER_CREATE_ERR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const orderInfoReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case constants.ORDER_INFO_REQ:
            return {
                ...state,
                loading: true,
            }
        case constants.ORDER_INFO_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            }
        case constants.ORDER_INFO_ERR:
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
        case constants.ORDER_PAY_SUCCESS:
            return { loading: false, success: true }
        case constants.ORDER_PAY_REQ:
            return { loading: true }
        case constants.ORDER_PAY_ERR:
            return { loading: false, error: action.payload }
        case constants.ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
}

export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case constants.ORDER_LIST_SUCCESS:
            return { loading: false, orders: action.payload }
        case constants.ORDER_LIST_REQ:
            return { loading: true, orders: [] }
        case constants.ORDER_LIST_ERR:
            return { loading: false, error: action.payload }
        case constants.ORDER_LIST_RESET:
            return { orders: [] }
        default:
            return state
    }
}

export const orderAdminListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case constants.ORDER_ADMIN_LIST_SUCCESS:
            return { loading: false, orders: action.payload }
        case constants.ORDER_ADMIN_LIST_REQ:
            return { loading: true, orders: [] }
        case constants.ORDER_ADMIN_LIST_ERR:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const orderDeliveryReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.ORDER_DELIVER_SUCCESS:
            return { loading: false, success: true }
        case constants.ORDER_DELIVER_REQ:
            return { loading: true }
        case constants.ORDER_DELIVER_ERR:
            return { loading: false, error: action.payload }
        case constants.ORDER_DELIVER_RESET:
            return {}
        default:
            return state
    }
}