import { ORDER_CREATE_ERR, ORDER_CREATE_REQ, ORDER_CREATE_SUCCESS } from '../consts/orderConsts'

export const createOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_SUCCESS:
            return { loading: false, order: action.payload }
        case ORDER_CREATE_REQ:
            return { loading: true }
        case ORDER_CREATE_ERR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}