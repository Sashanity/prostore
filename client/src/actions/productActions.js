import axios from 'axios'
import { PRODUCT_LIST_ERR, PRODUCT_LIST_REQ, PRODUCT_LIST_SUCCESS, PRODUCT_ERR, PRODUCT_REQ, PRODUCT_SUCCESS } from '../consts/productsConsts'

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