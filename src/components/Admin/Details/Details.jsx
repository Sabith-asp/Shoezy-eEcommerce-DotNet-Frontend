import React, { useEffect, useState } from "react";
import "./Details.css";
import CountUp from "react-countup";
import LatestOrders from "../LatestOrders/LatestOrders";
import CircularChart from "../CircularChart/CircularChart";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../Redux/AdminSlice/adminSlice";
import api from "../../../api/api";

const Details = () => {
  const { products, users } = useSelector((state) => state.admin);
  const [revenue, setRevenue] = useState(0);

  const fetchRevenue = async () => {
    var response = await api.get("/api/Order/get-revenue");
    setRevenue(response?.data?.data);
  };

  const totalStocks = products?.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    fetchRevenue();
  }, []);

  const statData = [
    { title: "Products", count: products.length, color: "#ff6384" },
    { title: "Users", count: users.length, color: "#36a2eb" },
    { title: "Sales", count: revenue, color: "#ff9f40" },
    { title: "Stocks", count: totalStocks, color: "#4bc0c0" },
  ];

  return (
    <div className="container-fluid p-3">
      <h3 className="fw-semibold mt-3 text-primary">Dashboard Details</h3>
      <div className="row">
        {statData.map((item, index) => (
          <div className="col-12 col-md-5 mb-3" key={index}>
            <div
              className="stat-box p-3 rounded-4 d-flex flex-column justify-content-center text-white"
              style={{
                background: `linear-gradient(135deg, ${item.color}, #1e1e1e)`,
              }}
            >
              <h2 className="mb-0 mt-2 fw-bolder counts">
                <CountUp start={0} end={parseInt(item.count)} duration={2} />
              </h2>
              <h5 className="fw-bold">{item.title}</h5>
            </div>
          </div>
        ))}
      </div>

      <LatestOrders />
      <div className="category-chart">
        <h3 className="fw-semibold mt-3">Categories</h3>
        <CircularChart />
      </div>
    </div>
  );
};

export default Details;
