import React from "react";
import "./AdminCartCard.css";

const AdminCartCard = ({ product }) => {
  return (
    <div>
      <div className="admin-cart-item mt-2 d-flex position-relative p-2 align-items-center rounded-4">
        <div className="cart-img rounded-3  overflow-hidden">
          <img
            className="bg-white h-100 w-100 object-fit-cover "
            src={product.image}
            alt=""
          />
        </div>
        <div className="d-flex w-100 ps-3  flex-column  text-white">
          <h6>{product.title}</h6>
          <span className="mb-0">Brand: {product.brand}</span>
          <span className="mb-0">Qty: {product.quantity}</span>
        </div>
        <h4 className="cart-price fw-bolder position-absolute">
          ₹{product.quantity * product.price}
        </h4>
      </div>
    </div>
  );
};

export default AdminCartCard;
