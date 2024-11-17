import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { Outlet, Link } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";
import { CartContext } from "../../context/CartProvider";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  const [currentCart, setCurrentCart] = useState([]);
  console.log("cart loaded");
  const { cart } = useContext(CartContext);
  useEffect(() => {
    fetchCart();
  }, [cart]);
  const id = localStorage.getItem("id");
  const fetchCart = async () => {
    if (!id) {
      toast.error("Login now to view cart");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      setCurrentCart(response.data.cart);
    } catch (error) {}
    console.log(currentCart);
  };
  return (
    <div className="cart container-md">
      <div className="row">
        <div className="left3 pt-0 p-3 col-12 col-sm-7">
          {currentCart.length === 0 ? (
            <div>
              <h3 className="fw-bold">No items in cart</h3>
            </div>
          ) : (
            <div>
              {currentCart.map((item) => (
                <CartItem product={item} />
              ))}
            </div>
          )}

          {/* {cartCount === 0 ? (
            <div>
              <h3 className="fw-bold">No items in cart</h3>
            </div>
          ) : (
            
            <div>
              {state.map((item) => (
                <CartItem key={item.id} product={item} states={item} />
              ))}
            </div>
          )} */}

          {/* map */}
        </div>
        <div className="p-3 p-md-0 col-12 col-sm-4">
          <div className="right3 p-4 ms-0 ms-md-3 bg-secondary-subtle">
            <h4>Cart Summary</h4>
            <p>Total Price : </p>
            <h1 className="fw-bold">₹{"totalPrices"}</h1>
            <Link to="/cart">
              <button
                className={`checkout-btn w-100 border-0 text-white rounded-2 py-2`}
                // disabled={cartCount === 0}
              >
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
