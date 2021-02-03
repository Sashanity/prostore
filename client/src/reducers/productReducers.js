import * as constants from '../consts/productsConsts'

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case constants.PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages
            }
        case constants.PRODUCT_LIST_REQ:
            return { loading: true, products: [] }
        case constants.PRODUCT_LIST_ERR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case constants.PRODUCT_SUCCESS:
            return { loading: false, product: action.payload }
        case constants.PRODUCT_REQ:
            return { loading: true, ...state }
        case constants.PRODUCT_ERR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case constants.PRODUCT_DELETE_REQ:
            return { loading: true }
        case constants.PRODUCT_DELETE_ERR:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const createProductReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case constants.PRODUCT_CREATE_REQ:
            return { loading: true }
        case constants.PRODUCT_CREATE_ERR:
            return { loading: false, error: action.payload }
        case constants.PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const productEditReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case constants.PRODUCT_EDIT_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case constants.PRODUCT_EDIT_REQ:
            return { loading: true }
        case constants.PRODUCT_EDIT_ERR:
            return { loading: false, error: action.payload }
        case constants.PRODUCT_EDIT_RESET:
            return { product: {} }
        default:
            return state
    }
}

export const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.PRODUCT_ADD_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case constants.PRODUCT_ADD_REVIEW_REQ:
            return { loading: true }
        case constants.PRODUCT_ADD_REVIEW_ERR:
            return { loading: false, error: action.payload }
        case constants.PRODUCT_REVIEW_RESET:
            return {}
        default:
            return state
    }
}

export const productTopListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case constants.PRODUCT_TOP_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case constants.PRODUCT_TOP_LIST_REQ:
            return { loading: true, products: [] }
        case constants.PRODUCT_TOP_LIST_ERR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}




