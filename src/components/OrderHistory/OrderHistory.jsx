import React, { useContext, useEffect, useState } from "react";
import "./OrderHistory.css";
import { CartContext } from "../../context/CartProvider";
import axios from "axios";
import { MdOutlinePayment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../Redux/OrderSlice/orderSlice";
const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchOrders()); // Fetch orders when the component mounts
      console.log("order rendered");
    }
  }, [dispatch, accessToken]);

  console.log("order rendered");
  console.log(orders);

  return (
    <section className="order container">
      <div className="row">
        {/* <div className="col-12 col-md-5"> */}
        <h2 className="fw-bold">Orders</h2>
        {orders.length === 0 ? (
          <div>
            <h4 className="text-danger">No orders..</h4>
          </div>
        ) : (
          orders
            ?.slice()
            ?.reverse()
            .map((item) => (
              <div key={item.orderId} className="col-4 ">
                <div className="bg-secondary-subtle rounded-4 p-2 mb-2">
                  <h6>Order ID: {item.orderId}</h6>
                  {item?.orderProducts?.map((product) => (
                    <div key={product?.orderItemId} className="">
                      <div className="order-item rounded-4 text-white d-flex p-2 mb-3">
                        <img
                          className="order-img rounded-4 bg-white"
                          src={product.image}
                          alt={product.productName}
                        />
                        <div className="ms-3">
                          <p className="m-0">{product.productName}</p>
                          <h6 className="mb-0">₹ {product.totalAmount}</h6>
                          <p className="mb-0">Qty: {product.quantity}</p>
                          {/* <p className="m-0">
                            <MdOutlinePayment className="mb-1 me-1" />
                            {item.paymentMode}
                          </p> */}
                        </div>
                      </div>
                    </div>
                  ))}
                  <p className="mb-0">
                    Date: {new Date(item.orderDate).toLocaleDateString()}
                  </p>
                  <p className="mb-0">
                    Time: {new Date(item.orderDate).toLocaleTimeString()}
                  </p>
                  {/* <p className="mb-0">Payment : {item.paymentMode}</p> */}
                  <h5>Total: {item.totalPrice}</h5>
                </div>
              </div>
            ))
        )}
        {/* </div> */}
      </div>
    </section>
  );
};

export default OrderHistory;
