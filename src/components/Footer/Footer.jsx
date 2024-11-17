import React from "react";
import "./Footer.css";
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="container-md">
      <div className="footer d-flex flex-column flex-md-row my-5  justify-content-between">
        <div className="footer-logo">
          <h1 className="fw-bold">ShoesY</h1>
          <p className="text-secondary">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit,
            voluptatibus?
          </p>
        </div>
        <div className="mx-2">
          <h5>Useful links</h5>
          <p>
            <a className="text-secondary" href="">
              Home
            </a>
          </p>
          <p>
            <a className="text-secondary" href="">
              Products
            </a>
          </p>
          <p>
            <a className="text-secondary" href="">
              Cart
            </a>
          </p>
        </div>
        <div className="mx-2">
          <h5>Main Menu</h5>
          <p>
            <a className="text-secondary" href="">
              Audio
            </a>
          </p>
          <p>
            <a className="text-secondary" href="">
              Gaming
            </a>
          </p>
          <p>
            <a className="text-secondary" href="">
              Mobile
            </a>
          </p>
          <p>
            <a className="text-secondary" href="">
              TV
            </a>
          </p>
        </div>
        <div className="mx-2">
          <h5>Useful links</h5>
          <p>
            <a className="text-secondary" href="">
              example@email.com
            </a>
          </p>
          <p>
            <a className="text-secondary" href="">
              +64 958 248 966
            </a>
          </p>
          <p>
            <a className="text-secondary" href="">
              Social media
            </a>
          </p>
        </div>
      </div>
      <div className="copyright d-flex flex-column flex-md-row py-3 justify-content-between align-items-center">
        <div className="icons d-flex  align-items-center ">
          <div className="copyright-icons p-2 rounded-circle mx-2">
            <FiFacebook className="fs-3" />
          </div>
          <div className="copyright-icons p-2 rounded-circle mx-2">
            <FiInstagram className="fs-3" />
          </div>
          <div className="copyright-icons p-2 rounded-circle mx-2">
            <FiTwitter className="fs-3" />
          </div>
          <div className="copyright-icons p-2 rounded-circle mx-2">
            <FiYoutube className="fs-3" />
          </div>
        </div>
        <div className="copyright-tect d-flex  position-relative">
          <p className="mt-3 mt-md-0">
            Copyright 2024 <span className="text-danger">SABITH</span> | All
            rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
