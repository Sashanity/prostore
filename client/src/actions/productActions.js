import axios from 'axios'
import * as constants from '../consts/productsConsts'

export const getProducts = (keyword = '', pageNum = '') => async (dispatch) => {
    try {
        // dispatch ({type, payload})
        dispatch({ type: constants.PRODUCT_LIST_REQ })
        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNum=${pageNum}`,)
        dispatch({ type: constants.PRODUCT_LIST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: constants.PRODUCT_LIST_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getProduct = (id) => async (dispatch) => {
    try {
        // dispatch ({type, payload})
        dispatch({ type: constants.PRODUCT_REQ })
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({ type: constants.PRODUCT_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: constants.PRODUCT_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: constants.PRODUCT_DELETE_REQ })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/products/${id}`, config)
        dispatch({ type: constants.PRODUCT_DELETE_SUCCESS })

    } catch (error) {
        dispatch({
            type: constants.PRODUCT_DELETE_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({ type: constants.PRODUCT_CREATE_REQ })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/products/`, {}, config)
        dispatch({
            type: constants.PRODUCT_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: constants.PRODUCT_DELETE_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const editProductAdmin = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: constants.PRODUCT_EDIT_REQ })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/products/${product._id}`, product, config)
        dispatch({ type: constants.PRODUCT_EDIT_SUCCESS, payload: data })
        dispatch({ type: constants.PRODUCT_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: constants.PRODUCT_EDIT_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const addReview = (productID, review) => async (dispatch, getState) => {
    try {
        console.log('adREview triggered')
        dispatch({ type: constants.PRODUCT_ADD_REVIEW_REQ })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.post(`/api/products/${productID}/reviews`, review, config)
        dispatch({ type: constants.PRODUCT_ADD_REVIEW_SUCCESS })
        // dispatch({ type: constants.PRODUCT_SUCCESS })

    } catch (error) {
        dispatch({
            type: constants.PRODUCT_ADD_REVIEW_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}