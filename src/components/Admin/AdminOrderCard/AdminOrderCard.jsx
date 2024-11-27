import React from "react";
import "./AdminOrderCard.css";

const AdminOrderCard = ({ order }) => {
  return (
    <div>
      <div className="admin-orders-card mt-2 bg-primary-subtle p-3 rounded-4">
        <p className="mb-0">Name: {order.name}</p>
        <p className="mb-0">Email: {order.email}</p>
        <p className="mb-0">Phone: {order.phone}</p>
        <p className="mb-0">Address: {order.address}</p>
        <p className="mb-0">City: {order.city}</p>
        <p className="mb-0">State: {order.state}</p>
        <p className="mb-0">Payment: {order.paymentMode}</p>
        <p className="mb-0">Date: {order.date.slice(0, 10)}</p>
        <p className="mb-0 fs-4 fw-bold">Total: {order.total}</p>
        <div className="orders d-flex mt-2">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="bg-primary p-1 rounded-3 me-2"
              style={{ width: "80px" }}
            >
              <div>
                <img
                  className="rounded-2"
                  style={{ height: "60px", width: "100%", objectFit: "cover" }}
                  src={item.image}
                  alt=""
                />
              </div>

              <div className="text-white">
                <p style={{ fontSize: "10px" }} className="mb-0">
                  {item.title}
                </p>
                <p style={{ fontSize: "10px" }} className="mb-0">
                  ₹{item.price}
                </p>
                <p style={{ fontSize: "10px" }} className="mb-0">
                  {item.qty}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderCard;
