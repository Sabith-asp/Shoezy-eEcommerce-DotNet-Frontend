import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import ContextProvider from "./context/Provider";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import ProductDetails from "./components/ProductDetail/ProductDetails";
import Cart from "./pages/Cart/Cart";
import CartProvider from "./context/CartProvider";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import Products from "./pages/Products/Products";
import AdminLayout from "./components/Admin/AdminLayout/AdminLayout";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import AdminProducts from "./components/Admin/AdminProducts/AdminProducts";
import Users from "./components/Admin/Users/Users";
import Block from "./components/Admin/Block/Block";
import ScrollToTop from "./components/scrollToTop/scrollToTop";
import Orders from "./components/Admin/Orders/Orders";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";

const Routers = () => {
  return (
    <Provider store={store}>
      <ContextProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="users" element={<Users />} />
                <Route path="block" element={<Block />} />
                <Route path="orders" element={<Orders />} />
              </Route>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/:category" element={<Products />} />
                <Route path="auth" element={<AuthLayout />} />
                <Route path="/product">
                  <Route path="detail/:id" element={<ProductDetails />} />
                </Route>
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="cart" element={<Cart />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ContextProvider>
    </Provider>
  );
};

export default Routers;
