import React, { useContext, useEffect } from "react";
import { ImCross } from "react-icons/im";
import "./CartItem.css";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { CartContext } from "../../context/CartProvider";

const CartItem = ({ product }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  return (
    <div className="cart-item py-2 px-4 p-md-4 py-md-0 mb-3 bg-secondary-subtle">
      <div className="row ms- align-items-center position-relative">
        <div className="cart-item-img my-2 col-4 col-md-5 col-lg-3 p-0">
          <img src={product.image} alt="" />
        </div>
        <div className="cart-item-details ms-2 col-6 ">
          <h5 className="ellipsis fw-bold">{product.title}</h5>
          <p>{product.brand}</p>
          <div>
            <p>
              ₹{product.price}/-
              <span className="ms-2">₹{product.price * product.quantity}</span>
            </p>
            <div>
              <button
                onClick={() => {
                  decreaseQuantity(product.id);
                  console.log("clicked");
                }}
                className="qty-button border-0 bg-transparent fs-4"
              >
                <FaCircleMinus className="qty-button" />
              </button>
              <span>{product.quantity}</span>
              <button
                onClick={() => {
                  increaseQuantity(product.id);
                }}
                className="border-0 bg-transparent fs-4"
              >
                <FaCirclePlus className="qty-button" />
              </button>
            </div>
          </div>
        </div>
        <span className="position-absolute pt-0 pe-0 pt-md-3 pe-md-2 top-0 text-end">
          <button
            onClick={() => {
              removeFromCart(product.id);
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
