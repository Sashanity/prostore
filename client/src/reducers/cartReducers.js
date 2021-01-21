import { CART_ADD_ITEM } from '../consts/cartConsts'

export const cartReducer = (state = { itemsInCart: [] }, action) => {
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

        default:
            return state
    }
}