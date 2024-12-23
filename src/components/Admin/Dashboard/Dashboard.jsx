import React from "react";
import Hero from "../Hero/Hero";
import Details from "../Details/Details";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard-container">
        <Hero />
        <Details />
      </div>
    </>
  );
};

export default Dashboard;
