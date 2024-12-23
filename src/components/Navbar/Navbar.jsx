import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { GiShoppingBag } from "react-icons/gi";
import { DataContext } from "../../context/Provider";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartProvider";
import { FaUserCircle } from "react-icons/fa";
const Navbar = () => {
  const { isUserLogin, setIsUserLogin } = useContext(DataContext);
  const { cart, setCart, user, logout } = useContext(CartContext);
  const cartCount = cart.length;
  console.log("navbar rerendered");

  return (
    <nav className="navbar navbar-expand-md px-2 px-md-5 bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold fs-3" href="#">
          ShoesY
        </a>
        <div>
          {!isUserLogin && (
            <button className=" d-md-none authbutton border-1 mx-0 mx-md-3 my-1 rounded-pill px-3 py-1">
              <Link to="/auth">Login</Link>
            </button>
          )}

          <button
            className=" position-relative navbar-toggler px-3 py-0"
            type="button"
          >
            <Link to="/cart">
              <GiShoppingBag />
            </Link>
            <span className="position-absolute cart-count">{cartCount}</span>
          </button>
          <button
            className="navbar-toggler p-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              ShoesY
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body align-items-center">
            <ul className="navbar-nav justify-content-center align-items-md-center flex-grow-1">
              <li data-bs-dismiss="offcanvas" className="nav-item">
                <Link
                  className="nav-link active"
                  to="/"
                  aria-current="page"
                  href="#"
                >
                  Home
                </Link>
              </li>
              <li data-bs-dismiss="offcanvas" className="nav-item">
                <Link to="/All" className="nav-link" href="#">
                  All
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Brands
                </a>
                <ul className="dropdown-menu">
                  <li data-bs-dismiss="offcanvas">
                    <Link to="/Adidas" className="dropdown-item" href="#">
                      Adidas
                    </Link>
                  </li>
                  <li data-bs-dismiss="offcanvas">
                    <Link to="/Nike" className="dropdown-item" href="#">
                      Nike
                    </Link>
                  </li>
                  <li data-bs-dismiss="offcanvas">
                    <Link to="/Puma" className="dropdown-item" href="#">
                      Puma
                    </Link>
                  </li>
                </ul>
              </li>
              <li data-bs-dismiss="offcanvas" className="nav-item">
                <Link to="/order-history" className="nav-link" href="#">
                  Orders
                </Link>
              </li>
            </ul>
            {isUserLogin && (
              <button className="user rounded-3 border-0 p-2">
                <FaUserCircle />
                <span className="ms-2">{user}</span>
              </button>
            )}
            <button className="border-0 position-relative d-none d-md-flex float-end mx-3 mb-3 mb-md-0 m-0 bg-transparent">
              <Link to="/cart">
                <GiShoppingBag className="fs-3" />
                <span className="position-absolute cart-count-md">
                  {cartCount}
                </span>
              </Link>
            </button>
            {/* <div>
              <form className="d-flex mt-3 mt-md-0 w-100" role="search">
                <input
                  className="search-input ps-3 p-1 w-75 border-0"
                  placeholder="type here.."
                  type="search"
                  aria-label="Search"
                />
                <button className="w-25 submit-button" type="submit">
                  Search
                </button>
              </form>
            </div> */}
            {!isUserLogin ? (
              <button className="authbutton border-1 float-end mx-0 mx-md-3 my-3 rounded-pill px-3 py-1">
                <Link to="/auth">Login</Link>
              </button>
            ) : (
              <button
                data-bs-dismiss="offcanvas"
                onClick={logout}
                className="authbutton border-1 float-end mx-0 mx-md-3 my-3 rounded-pill px-3 py-1"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
