import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";
import { FaCalendarAlt } from "react-icons/fa";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/allOrders");
        setAllOrders(data);
      } catch (error) {}
    };
    fetchOrders();
  }, []);

  return (
    <div className="all-orders container-fluid overflow-x-hidden p-0">
      <div className="row p-3">
        <h3 className="fw-semibold mb-0 mt-1">ALL ORDERS</h3>
        {allOrders
          .slice()
          .reverse()
          .map((order) => (
            <div key={order.id} className="col-md-6 col-12 p-0">
              <div className="each-order position-relative rounded-4 p-3 mb-3 mx-1 text-black">
                <p className="fw-bolder">Order Id: {order.id}</p>
                <div
                  style={{ top: "10px", right: "10px" }}
                  className="d-flex position-absolute bg-white text-black p-1 px-2 rounded-3"
                >
                  <FaCalendarAlt className="fs-5" />
                  <p className="ms-2 mb-0">{order.date.slice(0, 10)}</p>
                </div>

                <p className="fw-bold">User ID: {order.userId}</p>
                <p>Time: {order.date.slice(11, 19)}</p>
                <p>Name: {order.name}</p>
                <p>Email: {order.email}</p>
                <p>Phone: {order.phone}</p>
                <p>Address: {order.address}</p>
                <p>City: {order.city}</p>
                <p>State: {order.state}</p>
                <p>Pincode: {order.zip}</p>
                <p>Payment: {order.paymentMode}</p>
                <div className="d-flex mb-4 allorder-items ">
                  {order.items.map((item, index) => (
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
                  Total:<span className="fs-4 fw-bold"> ₹{order.total}</span>
                </h5>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;
