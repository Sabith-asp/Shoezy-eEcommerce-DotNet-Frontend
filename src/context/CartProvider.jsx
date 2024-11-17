import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const id = localStorage.getItem("id");
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    if (!id) {
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      setCart(response.data.cart);
    } catch (error) {
      setError(error.message || "Failed to fetch cart data");
      toast.error("Error in fetching cart data");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    const id_ = localStorage.getItem("id");
    if (!id_) {
      setError();
      toast.error("Login & Add product to cart");
      return;
    }
    try {
      const userData = await axios.get(`http://localhost:5000/users/${id_}`);
      const userCart = userData.data.cart;
      const existingIncart = userCart.find((item) => item.id === product.id);
      if (existingIncart) {
        toast.error("Product is already in cart");
        return;
      }
      const newCartItem = { ...product, quantity: 1 };
      await axios.patch(`http://localhost:5000/users/${id_}`, {
        cart: [...cart, newCartItem],
      });
      setCart((prev) => [...prev, newCartItem]);
      toast.success("Product added to cart");
    } catch (error) {
      toast.error("Error in adding product to cart");
      console.log(error.message || "Error in adding product to cart");
    }
  };

  const removeFromCart = async (id) => {
    const id_ = localStorage.getItem("id");
    try {
      const response = await axios.get(`http://localhost:5000/users/${id_}`);
      const currentCart = response.data.cart;
      const updatedCart = currentCart.filter((item) => item.id !== id);
      setCart(updatedCart);
      await axios.patch(`http://localhost:5000/users/${id_}`, {
        cart: [...updatedCart],
      });
      toast.success("Product removed from cart");
    } catch (error) {
      setError(error.message, "Error in removing from cart");
      toast.error("Error in removing from cart");
    }
  };

  const increaseQuantity = async (id) => {
    const userId = localStorage.getItem("id");
    if (!userId) return;

    try {
      setCart((prevCart) => {
        const updatedCart = prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        return updatedCart;
      });
      await axios.patch(`http://localhost:5000/users/${userId}`, {
        cart: cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        error,
        loading,
        addToCart,
        removeFromCart,
        increaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
