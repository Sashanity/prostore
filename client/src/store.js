import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { productListReducer, productReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productInfo: productReducer,
    cart: cartReducer
});
// fish out array of items in the cart from the local stirage
const itemsInCartLS = localStorage.getItem('itemsInCart') ? JSON.parse(localStorage.getItem('itemsInCart')) : []
const initState = {
    cart: { itemsInCart: itemsInCartLS }
}
const middleware = [thunk]

// composeWithDevTools() is used intead of ' +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()'
const store = createStore(reducer, initState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;