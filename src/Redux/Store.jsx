import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../Redux/CartSlice/CartSlice";
import orderReducer from "../Redux/OrderSlice/orderSlice";
import UserReducer from "../Redux/UserSlice/userSlice";
import AdminReducer from "./AdminSlice/adminSlice";
import ProductReducer from "./ProductSlice/productSlice";

export const store = configureStore({
  reducer: {
    orders: orderReducer,
    cart: CartReducer,
    user: UserReducer,
    admin: AdminReducer,
    products: ProductReducer,
  },
});

// console.log(user);
