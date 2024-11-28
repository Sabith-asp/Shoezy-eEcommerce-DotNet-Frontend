import React, { useContext, useEffect, useState } from "react";
import "./OrderHistory.css";
import { CartContext } from "../../context/CartProvider";
import axios from "axios";
import { MdOutlinePayment } from "react-icons/md";
const OrderHistory = () => {
  const { cart } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const id = localStorage.getItem("id");
    const fetchData = async () => {
      if (!id) {
        return;
      }
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      setOrders(response.data.order);
    };
    fetchData();
  }, [cart]);

  return (
    <section className="order container">
      <div className="row d-flex align-items-center justify-content-center">
        <div className="col-12 col-md-5">
          <h2 className="fw-bold">Orders</h2>
          {orders.length === 0 ? (
            <div>
              <h4 className="text-danger">No orders..</h4>
            </div>
          ) : (
            orders
              .slice()
              .reverse()
              .map((item) => (
                <div
                  key={item.id}
                  className="  bg-primary-subtle rounded-4 p-2 mb-2"
                >
                  <h6>Order ID: {item.id}</h6>
                  {item.items.map((product, index) => (
                    <div key={index} className="">
                      <div className="order-item rounded-4 text-white d-flex p-2 mb-3">
                        <img
                          className="order-img rounded-4"
                          src={product.image}
                          alt={product.title}
                        />
                        <div className="ms-3">
                          <p className="m-0">{product.title}</p>
                          <h6 className="mb-0">
                            ₹ {product.price * product.quantity}
                          </h6>
                          <p className="mb-0">Qty: {product.quantity}</p>
                          <p className="m-0">
                            <MdOutlinePayment className="mb-1 me-1" />
                            {item.paymentMode}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <p className="mb-0">Date: {item.date.slice(0, 10)}</p>
                  <p className="mb-0">Time: {item.date.slice(11, 16)}</p>
                  <p className="mb-0">Payment : {item.paymentMode}</p>
                  <h5>Total: {item.total}</h5>
                </div>
              ))
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderHistory;
