import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { GiShoppingBag } from "react-icons/gi";
import { DataContext } from "../../context/Provider";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartProvider";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../Redux/CartSlice/CartSlice";
import { fetchUser, logout } from "../../Redux/UserSlice/userSlice";
import { fetchProducts } from "../../Redux/ProductSlice/productSlice";
import { fetchOrders } from "../../Redux/OrderSlice/orderSlice";
import { FaHeart } from "react-icons/fa6";
import { fetchWishlist } from "../../Redux/WishlistSlice/WishlistSlice";
import api from "../../api/api";
const Navbar = () => {
  //   const { isUserLogin, setIsUserLogin } = useContext(DataContext);
  const { setCart, user } = useContext(CartContext);
  const { cart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.wishlist);
  const cartCount = cart?.totalItem;
  const wishlistCount = products?.length;
  console.log("navbar rerendered");
  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { userDetail } = useSelector((state) => state.user);
  console.log(userDetail);
  console.log(login);

  useEffect(() => {
    if (accessToken && role == "user") {
      console.log(accessToken);

      dispatch(fetchUser());

      dispatch(fetchCart());
      dispatch(fetchOrders());
      dispatch(fetchWishlist());
    }
  }, [dispatch, login]);

  useEffect(() => {
    console.log("Login state changed: ", login);
    console.log("User details updated: ", userDetail);
  }, [login, userDetail]);
  console.log(
    "Redux State: ",
    useSelector((state) => state)
  );

  const [showList, setShowList] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchProducts, setsearchProducts] = useState([]);

  const productss = ["Laptop", "Phone", "Tablet", "Headphones", "Smartwatch"];

  const searchProduct = async () => {
    const response = await api.get(`/api/Product/search?param=${searchTerm}`);
    setShowList(true);
    setsearchProducts(response?.data?.data);
    setShowList(!showList);
    setSearchTerm("");
  };

  return (
    <nav className="navbar navbar-expand-md px-2 px-md-5 bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold fs-3" href="#">
          ShoesY
        </a>
        <div>
          {!login && (
            <button className=" d-md-none authbutton border-1 mx-0 mx-md-3 my-1 rounded-pill px-3 py-1">
              <Link to="/auth">Login</Link>
            </button>
          )}

          <button
            className=" position-relative navbar-toggler ps-3 pe-0 py-0"
            type="button"
          >
            <Link to="/wishlist">
              <FaHeart />
            </Link>
            <span className="position-absolute wishlist-count">
              {wishlistCount || 0}
            </span>
          </button>
          <button
            className=" position-relative navbar-toggler px-3 py-0"
            type="button"
          >
            <Link to="/cart">
              <GiShoppingBag />
            </Link>
            <span className="position-absolute cart-count">
              {cartCount || 0}
            </span>
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
            <div className="input-wrapper me-3">
              <button className="icon" onClick={() => searchProduct()}>
                <svg
                  width="15px"
                  height="15px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    stroke="black"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M22 22L20 20"
                    stroke="black"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <input
                type="text"
                name="text"
                className="input"
                placeholder="Search.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {showList && (
                <ul className="search-list">
                  {searchProducts?.length > 0 ? (
                    searchProducts?.map((product) => (
                      <Link to={`product/detail/${product.id}`}>
                        <li key={product.id}>{product.title}</li>
                      </Link>
                    ))
                  ) : (
                    <li>No results found</li>
                  )}
                </ul>
              )}
            </div>

            {login && (
              <button className="user rounded-3 border-0 p-2">
                <FaUserCircle />
                <span className="ms-2">{userDetail.name}</span>
              </button>
            )}

            <button className="border-0 position-relative d-none d-md-flex float-end ms-3 me-0 mb-3 mb-md-0 m-0 bg-transparent">
              <Link to="/wishlist">
                <FaHeart className="fs-3" />
                <span className="position-absolute cart-count-md">
                  {wishlistCount || 0}
                </span>
              </Link>
            </button>

            <button className="border-0 position-relative d-none d-md-flex float-end mx-3 mb-3 mb-md-0 m-0 bg-transparent">
              <Link to="/cart">
                <GiShoppingBag className="fs-3" />
                <span className="position-absolute cart-count-md">
                  {cartCount || 0}
                </span>
              </Link>
            </button>

            {!login ? (
              <button className="authbutton border-1 float-end mx-0 mx-md-3 my-3 rounded-pill px-3 py-1">
                <Link to="/auth">Login</Link>
              </button>
            ) : (
              <button
                data-bs-dismiss="offcanvas"
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                  //   setIsUserLogin(false);
                }}
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
