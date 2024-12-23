import axios from "axios";
import React, { useEffect, useState } from "react";
import "./LatestOrders.css";

const LatestOrders = () => {
  const [latestOrder, setlatestOrder] = useState([]);
  const latestOrders = async () => {
    const { data } = await axios.get("http://localhost:5000/allOrders");
    console.log(data.slice(-5));

    setlatestOrder(data.slice(-5));
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
              <th>Date</th>
              <th>Time</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {latestOrder
              .slice()
              .reverse()
              .map((order) => (
                <tr>
                  <td>{order.id}</td>
                  <td>{order.items.length}</td>
                  <td>{order.name}</td>
                  <td>{order.date.slice(0, 10)}</td>
                  <td>{order.date.slice(11, 16)}</td>
                  <td>{order.total}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LatestOrders;
