import React from "react";
import { AiFillProduct } from "react-icons/ai";
import { FaCircleUser } from "react-icons/fa6";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="admin-hero container-fluid p-0 mt-4">
      <div className="d-flex container-fluid justify-content-center ">
        <div className="row">
          <div className="col-6">
            <div className="hero-btn d-flex flex-column align-items-center p-3 rounded-4">
              <AiFillProduct style={{ fontSize: "80px" }} />
              <h5>Products</h5>
            </div>
          </div>
          <div className="col-6">
            <div className="hero-btn d-flex flex-column align-items-center p-3 rounded-4">
              <FaCircleUser style={{ fontSize: "80px" }} />
              <h5>Users</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
