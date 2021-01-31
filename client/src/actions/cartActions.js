import axios from 'axios'
import * as constants from '../consts/cartConsts'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: constants.CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        },
    })

    // save array to local storage
    localStorage.setItem('itemsInCart', JSON.stringify(getState().cart.itemsInCart))
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: constants.CART_REMOVE_ITEM,
        payload: id
    })

    // save array to local storage
    localStorage.setItem('itemsInCart', JSON.stringify(getState().cart.itemsInCart))
}

export const saveShippingAddress = (data) => async (dispatch) => {
    dispatch({
        type: constants.CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    // save array to local storage
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => async (dispatch) => {
    dispatch({
        type: constants.CART_SAVE_PAYMENT_METHOD,
        payload: data
    })


    // save array to local storage
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}