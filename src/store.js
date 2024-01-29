// store.js
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk";
import promiseMiddleware from 'redux-promise';
import {
  newProductReducer,
  productDetailsReducer,
  productReducer,
} from "./reducers/productReducer";
import {
  ProfileReducer,
  UserReducer,
  forgotPasswordReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
} from "./reducers/orderReducer";
import { deleteProduct } from "./actions/productActions";

// Define your reducer
const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: UserReducer,
  profile: ProfileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newOrderReducer,
  newProduct: newProductReducer,
  deleteProduct: deleteProduct,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk, promiseMiddleware))
);

export default store;
