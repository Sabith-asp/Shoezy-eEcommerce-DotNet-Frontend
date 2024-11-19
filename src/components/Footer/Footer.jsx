import React from "react";
import "./Footer.css";
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="container-md">
      <div className="footer d-flex flex-column flex-md-row my-5 justify-content-between">
        <div className="footer-logo">
          <h1 className="fw-bold">ShoesY</h1>
          <p className="text-secondary">
            Step into style and comfort with ShoesY. Discover our wide range of
            premium footwear for every occasion.
          </p>
        </div>
        <div className="mx-2">
          <h5>Customer Service</h5>
          <p>
            <a className="text-secondary" href="#">
              Contact Us
            </a>
          </p>
          <p>
            <a className="text-secondary" href="#">
              Shipping Info
            </a>
          </p>
          <p>
            <a className="text-secondary" href="#">
              Return Policy
            </a>
          </p>
          <p>
            <a className="text-secondary" href="#">
              FAQs
            </a>
          </p>
        </div>
        <div className="mx-2">
          <h5>Shop Categories</h5>
          <p>
            <a className="text-secondary" href="#">
              Men's Shoes
            </a>
          </p>
          <p>
            <a className="text-secondary" href="#">
              Women's Shoes
            </a>
          </p>
          <p>
            <a className="text-secondary" href="#">
              Kids' Shoes
            </a>
          </p>
          <p>
            <a className="text-secondary" href="#">
              Sports Shoes
            </a>
          </p>
        </div>
        <div className="mx-2">
          <h5>Contact Information</h5>
          <p>
            <a className="text-secondary" href="mailto:support@shoesy.com">
              support@shoesy.com
            </a>
          </p>
          <p>
            <a className="text-secondary" href="tel:+1234567890">
              +1 234 567 890
            </a>
          </p>
        </div>
      </div>
      <div className="copyright d-flex flex-column flex-md-row py-3 justify-content-between align-items-center">
        <div className="icons d-flex align-items-center">
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
        <div className="copyright-text">
          <p className="mt-3 mt-md-0">
            &copy; 2024 <span className="text-danger">ShoesY</span>. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
