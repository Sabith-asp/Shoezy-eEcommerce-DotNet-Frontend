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
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      setOrders(response.data.order);
    };
    fetchData();
  }, [cart]);
  console.log(orders);

  return (
    <section className="order container">
      <div className="row d-flex align-items-center justify-content-center">
        <div className="col-12 col-md-5">
          {orders.length === 0 ? (
            <div>
              <h4 className="text-danger">No orders..</h4>
            </div>
          ) : (
            orders.map((item) =>
              item.items.map((product) => (
                <div key={product.id} className="">
                  <div className="order-item rounded-4 text-white d-flex p-2 mb-3">
                    <img
                      className="order-img rounded-4"
                      src={product.image}
                      alt={product.title}
                    />
                    <div className="ms-3">
                      <p className="m-0">{product.title}</p>
                      <h6>₹ {item.total}</h6>
                      <p className="m-0">
                        <MdOutlinePayment className="mb-1 me-1" />
                        {item.paymentMode}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderHistory;
