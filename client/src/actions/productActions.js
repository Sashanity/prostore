import axios from 'axios'
import { PRODUCT_LIST_ERR, PRODUCT_LIST_REQ, PRODUCT_LIST_SUCCESS, PRODUCT_ERR, PRODUCT_REQ, PRODUCT_SUCCESS, PRODUCT_DELETE_REQ, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_ERR, PRODUCT_EDIT_REQ, PRODUCT_EDIT_SUCCESS, PRODUCT_EDIT_ERR, PRODUCT_CREATE_REQ, PRODUCT_CREATE_SUCCESS } from '../consts/productsConsts'

export const getProducts = () => async (dispatch) => {
    try {
        // dispatch ({type, payload})
        dispatch({ type: PRODUCT_LIST_REQ })
        const { data } = await axios.get(`/api/products`)
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getProduct = (id) => async (dispatch) => {
    try {
        // dispatch ({type, payload})
        dispatch({ type: PRODUCT_REQ })
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({ type: PRODUCT_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: PRODUCT_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQ })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/products/${id}`, config)
        dispatch({ type: PRODUCT_DELETE_SUCCESS })

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQ })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/products/`, {}, config)
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const editProductAdmin = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_EDIT_REQ })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/products/${product._id}`, product, config)
        dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data })


        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: PRODUCT_EDIT_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}