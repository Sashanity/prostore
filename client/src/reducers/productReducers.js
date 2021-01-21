import { PRODUCT_LIST_ERR, PRODUCT_LIST_REQ, PRODUCT_LIST_SUCCESS, PRODUCT_ERR, PRODUCT_REQ, PRODUCT_SUCCESS } from '../consts/productsConsts'

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

export const productReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_REQ:
            return { loading: true, ...state }
        case PRODUCT_ERR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

