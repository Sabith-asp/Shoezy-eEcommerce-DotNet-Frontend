import React, { useContext, useState } from "react";
import "./Navbar.css";
import { GiShoppingBag } from "react-icons/gi";
import { DataContext } from "../../context/Provider";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { isUserLogin, setIsUserLogin } = useContext(DataContext);
  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    setIsUserLogin(!isUserLogin);
  };
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

          <button className="navbar-toggler px-3 py-0" type="button">
            <GiShoppingBag />
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
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/"
                  aria-current="page"
                  href="#"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <button className="border-0 d-none d-md-flex float-end mx-3 mb-3 mb-md-0 m-0 bg-transparent">
              <Link to="/cart">
                <GiShoppingBag className="fs-3" />
              </Link>
            </button>
            <div>
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
            </div>
            {!isUserLogin ? (
              <button className="authbutton border-1 float-end mx-0 mx-md-3 my-3 rounded-pill px-3 py-1">
                <Link to="/auth">Login</Link>
              </button>
            ) : (
              <button
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
