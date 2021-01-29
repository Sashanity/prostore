import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_RESET, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from '../consts/cartConsts'

export const cartReducer = (state = { itemsInCart: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload

            // check if item exists
            const itemExist = state.itemsInCart.find((i) => i.product === item.product)

            if (itemExist) {
                return {
                    ...state,
                    itemsInCart: state.itemsInCart.map((i) => i.product === itemExist.product ? item : i)
                }
            }
            else {
                // if item doesn't exist in the cart, add itme to the cart itemsInCart array
                return { ...state, itemsInCart: [...state.itemsInCart, item] }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                // reset array of items in the cart, fildter out the chosen one
                itemsInCart: state.itemsInCart.filter((i) => i.product !== action.payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        case CART_RESET:
            return {
                ...state,
                itemsInCart: []
            }

        default:
            return state
    }
}