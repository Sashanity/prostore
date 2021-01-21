import axios from 'axios'
import { CART_ADD_ITEM } from '../consts/cartConsts'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            image: data.image,
            name: data.name,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    // save array to local storage
    localStorage.setItem('itemsInCart', JSON.stringify(getState().cart.itemsInCart))
}
