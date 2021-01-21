import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { productListReducer, productReducer } from './reducers/productReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productInfo: productReducer
});
const initState = {}
const middleware = [thunk]

// composeWithDevTools() is used intead of ' +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()'
const store = createStore(reducer, initState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;