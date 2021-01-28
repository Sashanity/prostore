import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { productListReducer, productReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers'
import { loginUserReducer, signupReducer, getProfileReducer, updateProfileReducer, userListReducer, userDeleteReducer } from './reducers/userReducers'
import { createOrderReducer, orderInfoReducer, updateOrderPayReducer, orderListReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productInfo: productReducer,
    cart: cartReducer,
    userLogin: loginUserReducer,
    userSingup: signupReducer,
    userProfile: getProfileReducer,
    userUpdateProfile: updateProfileReducer,
    orderCreate: createOrderReducer,
    orderInfo: orderInfoReducer,
    orderPaid: updateOrderPayReducer,
    orderList: orderListReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer

});
// fish out array of items in the cart and user info from the local storage
const itemsInCartLS = localStorage.getItem('itemsInCart') ? JSON.parse(localStorage.getItem('itemsInCart')) : []
const userInfoLS = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressLS = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initState = {
    cart: { itemsInCart: itemsInCartLS, shippingAddress: shippingAddressLS },
    userLogin: { userInfo: userInfoLS },

}
const middleware = [thunk]

// composeWithDevTools() is used intead of ' +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()'
const store = createStore(reducer, initState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;