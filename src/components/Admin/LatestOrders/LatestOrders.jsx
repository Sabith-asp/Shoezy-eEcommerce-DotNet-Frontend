import axios from "axios";
import React, { useEffect, useState } from "react";
import "./LatestOrders.css";
import api from "../../../api/api";

const LatestOrders = () => {
  const [latestOrder, setlatestOrder] = useState([]);
  const latestOrders = async () => {
    const { data } = await api.get("/api/Order/get-all-orders");
    console.log(data?.data?.slice(-5));
    setlatestOrder(data?.data?.slice(-5));
  };
  useEffect(() => {
    latestOrders();
  }, []);
  return (
    <>
      <h3 className=" fw-semibold mt-3">Latest Orders</h3>
      <div className="latest-order w-100">
        <table className="latest-order-table ">
          <thead className="">
            <tr>
              <th>ID</th>
              <th>No of Items</th>
              <th>Name</th>
              <th>Date & Time</th>
              <th>Transaction Id</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {latestOrder
              ?.slice()
              .reverse()
              .map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.orderProducts.length}</td>
                  <td>{order.address?.name}</td>
                  <td>
                    {new Date(order.orderDate).toLocaleDateString()},{" "}
                    {new Date(order.orderDate).toLocaleTimeString()}
                  </td>
                  <td>{order.transactionId}</td>
                  <td>{order.totalPrice}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LatestOrders;
