import { PRODUCT_LIST_ERR, PRODUCT_LIST_REQ, PRODUCT_LIST_SUCCESS } from '../consts/productsConsts'

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_REQ:
            return { loading: true, products: [] }
        case PRODUCT_LIST_ERR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

