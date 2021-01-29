import { PRODUCT_LIST_ERR, PRODUCT_LIST_REQ, PRODUCT_LIST_SUCCESS, PRODUCT_ERR, PRODUCT_REQ, PRODUCT_SUCCESS, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_REQ, PRODUCT_DELETE_ERR, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_REQ, PRODUCT_CREATE_ERR, PRODUCT_EDIT_RESET, PRODUCT_EDIT_ERR, PRODUCT_EDIT_REQ, PRODUCT_EDIT_SUCCESS, PRODUCT_CREATE_RESET } from '../consts/productsConsts'

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

export const createProductReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_CREATE_REQ:
            return { loading: true }
        case PRODUCT_CREATE_ERR:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const productEditReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_EDIT_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_EDIT_REQ:
            return { loading: true }
        case PRODUCT_EDIT_ERR:
            return { loading: false, error: action.payload }
        case PRODUCT_EDIT_RESET:
            return { product: {} }
        default:
            return state
    }
}



