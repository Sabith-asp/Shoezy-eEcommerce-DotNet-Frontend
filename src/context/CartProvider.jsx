import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DataContext } from "./Provider";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { isUserLogin } = useContext(DataContext);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const id = localStorage.getItem("id");
  useEffect(() => {
    fetchCart();
  }, [isUserLogin]);

  const fetchCart = async () => {
    if (!id) {
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      setCart(response.data.cart);
      setUser(response.data.name);
    } catch (error) {
      setError(error.message || "Failed to fetch cart data");
      toast.error("Error in fetching cart data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCartCount(cart.length);
  }, [cart, cart.length]);

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
      const productResponse = await axios.get(
        `http://localhost:5000/products/${id}`
      );
      const stockQty = productResponse.data.quantity;

      const userResponse = await axios.get(
        `http://localhost:5000/users/${userId}`
      );
      const userCart = userResponse.data.cart;
      const currentItem = userCart.find((item) => item.id === id);
      const currentQty = currentItem.quantity;

      if (currentQty + 1 > stockQty) {
        toast.error("Quantity exceeds stock!");
        return;
      }

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );

      const updatedCart = userCart.map((item) =>
        item.id === id ? { ...item, quantity: currentQty + 1 } : item
      );
      await axios.patch(`http://localhost:5000/users/${userId}`, {
        cart: updatedCart,
      });
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart. Please try again.");
    }
  };
  const decreaseQuantity = async (id) => {
    const userId = localStorage.getItem("id");
    if (!userId) return;

    try {
      const userResponse = await axios.get(
        `http://localhost:5000/users/${userId}`
      );
      const userCart = userResponse.data.cart;
      const currentItem = userCart.find((item) => item.id === id);
      const currentQty = currentItem ? currentItem.quantity : 0;

      if (currentQty <= 1) {
        toast.error("Minimum quantity is 1!");
        return;
      }

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );

      const updatedCart = userCart.map((item) =>
        item.id === id ? { ...item, quantity: currentQty - 1 } : item
      );
      await axios.patch(`http://localhost:5000/users/${userId}`, {
        cart: updatedCart,
      });
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart. Please try again.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        user,
        error,
        loading,
        addToCart,
        cartCount,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
