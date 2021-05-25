import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducers";

import {
  productListReducer,
  productDetailReducer,
} from "./reducers/productReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
});

const cartItemsFromStorage = localStorage.get("cartItems")
  ? JSON.parse(localStorage.get("cartItems"))
  : [];

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
