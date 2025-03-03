import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";
import { FaCalendarAlt } from "react-icons/fa";
import api from "../../../api/api";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/api/Order/get-all-orders");
        setAllOrders(data?.data);
        setLoading(false);
        console.log(data?.data);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="all-orders container-fluid overflow-x-hidden p-0">
      <div className="row p-3">
        <h3 className="fw-semibold mb-0 mt-1">ALL ORDERS</h3>
        {allOrders
          ?.slice()
          .reverse()
          .map((order) => (
            <div key={order.orderId} className="col-md-6 col-12 p-0">
              <div className="each-order position-relative rounded-4 p-3 mb-3 mx-1 text-black">
                <p className="fw-bolder mt-4">Order Id: {order.orderId}</p>
                <div
                  style={{ top: "10px", right: "10px" }}
                  className="d-flex position-absolute bg-white text-black p-1 px-2 rounded-3"
                >
                  <FaCalendarAlt className="fs-5" />
                  <p className="ms-2 mb-0">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>

                {/* <p className="fw-bold">User ID: {order.userId}</p> */}
                <p>Time: {new Date(order.orderDate).toLocaleTimeString()}</p>
                <p>Name: {order?.address?.name}</p>
                <p>Email: {order?.address?.email}</p>
                <p>Phone: {order?.address?.phone}</p>
                <p>House name: {order?.address?.houseName}</p>
                <p>City: {order?.address?.city}</p>
                <p>State: {order?.address?.state}</p>
                <p>Pincode: {order?.address?.pincode}</p>
                {/* <p>Payment: {order.paymentMode}</p> */}
                <div className="d-flex mb-4 allorder-items ">
                  {order?.orderProducts.map((item, index) => (
                    <div
                      key={index}
                      className="p-1 me-2 mt-2 allorder-each rounded-3 mb-1"
                    >
                      <div className="w-100">
                        <img
                          style={{
                            width: "100%",
                            height: "70px",
                            backgroundColor: "white",
                          }}
                          className="rounded-3"
                          src={item.image}
                          alt="Product"
                        />
                      </div>
                      <div className="d-flex flex-column text-white mt-1 overflow-hidden">
                        <span
                          style={{ fontSize: "10px", whiteSpace: "nowrap" }}
                        >
                          {item.title}
                        </span>
                        <span style={{ fontSize: "10px" }}>₹ {item.price}</span>
                        <span style={{ fontSize: "10px" }}>
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <h5 className="total-price text-black  mb-0 position-absolute">
                  Total:
                  <span className="fs-4 fw-bold"> ₹{order.totalPrice}</span>
                </h5>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;
