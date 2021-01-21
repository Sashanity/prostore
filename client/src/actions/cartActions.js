import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../consts/cartConsts'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
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
        type: CART_REMOVE_ITEM,
        payload: id
    })

    // save array to local storage
    localStorage.setItem('itemsInCart', JSON.stringify(getState().cart.itemsInCart))
}