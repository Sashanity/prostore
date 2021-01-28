import { PRODUCT_LIST_ERR, PRODUCT_LIST_REQ, PRODUCT_LIST_SUCCESS, PRODUCT_ERR, PRODUCT_REQ, PRODUCT_SUCCESS, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_REQ, PRODUCT_DELETE_ERR } from '../consts/productsConsts'

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

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_DELETE_REQ:
            return { loading: true }
        case PRODUCT_DELETE_ERR:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


