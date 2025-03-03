import React, { useContext, useEffect } from "react";
import { ImCross } from "react-icons/im";
import "./CartItem.css";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { CartContext } from "../../context/CartProvider";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../Redux/CartSlice/CartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();

  const userId = localStorage.getItem("id");

  const handleIncreaseQuantity = (cartItemId) => {
    dispatch(increaseQuantity(cartItemId));
  };

  const handleDecreaseQuantity = (cartItemId) => {
    dispatch(decreaseQuantity(cartItemId));
  };

  const handleRemoveFromCart = (cartItemId) => {
    dispatch(removeFromCart(cartItemId));
  };

  return (
    <div className="cart-item position-relative py-2 px-4 p-md-4 py-md-0 mb-3 bg-secondary-subtle">
      <div className="row align-items-center position-relative">
        <div className="cart-item-img my-2 col-4 col-md-5 col-lg-3 p-0">
          <img src={product.image} alt={product.productName} />
        </div>
        <div className="cart-item-details ms-2 col-6 ">
          <h5 className="ellipsis fw-bold">{product.productName}</h5>
          {/* <p>{product.brand}</p> */}
          <div>
            <div className="cart-item-price position-absolute float-end">
              <h5 className="float-end"> ₹{product.price}/-</h5>
              <h2 className="ms-2 fw-bold">₹{product.totalAmount}</h2>
            </div>
            <div>
              <button
                onClick={() => {
                  handleDecreaseQuantity(product.cartItemId);

                  console.log("clicked");
                }}
                className="qty-button border-0 bg-transparent fs-3"
              >
                <FaCircleMinus className="qty-button" />
              </button>
              <span>{product.quantity}</span>
              <button
                onClick={() => {
                  handleIncreaseQuantity(product.cartItemId);
                }}
                className="border-0 bg-transparent fs-3"
              >
                <FaCirclePlus className="qty-button" />
              </button>
            </div>
          </div>
        </div>
        <span className="position-absolute pt-0 pe-0 pt-md-3 pe-md-2 top-0 text-end">
          <button
            onClick={() => {
              handleRemoveFromCart(product.cartItemId);
            }}
            className="rounded border-1 border-danger pb-1 bg-white"
          >
            <ImCross className="text" />
          </button>
        </span>
      </div>
    </div>
  );
};

export default React.memo(CartItem);
