import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../Redux/CartSlice/CartSlice";
import orderReducer from "../Redux/OrderSlice/orderSlice";
import UserReducer from "../Redux/UserSlice/userSlice";
import AdminReducer from "./AdminSlice/adminSlice";

export const store = configureStore({
  reducer: {
    orders: orderReducer,
    cart: CartReducer,
    user: UserReducer,
    admin: AdminReducer,
  },
});

console.log("helooo");
