import React from "react";
import { AiFillProduct } from "react-icons/ai";
import { FaCircleUser } from "react-icons/fa6";
import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="admin-hero container-fluid p-0 mt-4">
      <div className="d-flex container-fluid justify-content-center ">
        <div className="row">
          <div className="col-6">
            <Link to="/admin/products">
              <div className="hero-btn d-flex flex-column align-items-center p-2 rounded-4">
                <AiFillProduct style={{ fontSize: "40px" }} />
                <h6>Products</h6>
              </div>
            </Link>
          </div>
          <div className="col-6">
            <Link to="/admin/users">
              <div className="hero-btn d-flex flex-column align-items-center p-2 rounded-4">
                <FaCircleUser style={{ fontSize: "40px" }} />
                <h6>Users</h6>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
