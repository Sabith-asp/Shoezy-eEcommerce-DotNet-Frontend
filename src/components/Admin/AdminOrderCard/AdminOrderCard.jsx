import React from "react";
import "./AdminOrderCard.css";

const AdminOrderCard = ({ order }) => {
  return (
    <div>
      <div className="admin-orders-card mt-2 bg-primary-subtle p-3 rounded-4">
        <p className="mb-0">Name: {order?.address?.name}</p>
        <p className="mb-0">Email: {order?.address?.email}</p>
        <p className="mb-0">Phone: {order?.address?.phone}</p>
        <p className="mb-0">House name: {order?.address?.houseName}</p>
        <p className="mb-0">City: {order?.address?.city}</p>
        <p className="mb-0">State: {order?.address?.state}</p>
        {/* <p className="mb-0">Payment: {order.paymentMode}</p> */}
        <p className="mb-0">
          Date: {new Date(order?.orderDate).toLocaleDateString()}
        </p>
        <p className="mb-0 fs-4 fw-bold">Total: {order.totalPrice}</p>
        <div className="orders d-flex mt-2">
          {order?.orderProducts?.map((item) => (
            <div
              key={item.productId}
              className=" p-1 rounded-3 me-2 flex-shrink-0 mb-1"
              style={{ width: "80px", backgroundColor: "var(--primary-color)" }}
            >
              <div>
                <img
                  className="rounded-2 bg-white"
                  style={{ height: "60px", width: "100%", objectFit: "cover" }}
                  src={item.image}
                  alt=""
                />
              </div>

              <div className="text-white">
                <p style={{ fontSize: "10px" }} className="mb-0">
                  {item.productName}
                </p>
                <p style={{ fontSize: "10px" }} className="mb-0">
                  ₹{item.price}
                </p>
                <p style={{ fontSize: "10px" }} className="mb-0">
                  {item.quantity} Qty
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
