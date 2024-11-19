import React, { useContext, useEffect, useMemo, useState } from "react";
import "./Cart.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";
import { CartContext } from "../../context/CartProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Cart = () => {
  const [currentCart, setCurrentCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [payment, setPayment] = useState(null);
  const navigate = useNavigate();
  console.log("cart loaded");
  const { cart, cartCount } = useContext(CartContext);
  useEffect(() => {
    fetchCart();
  }, [cart]);
  const id = localStorage.getItem("id");
  const fetchCart = async () => {
    if (!id) {
      toast.error("Login now to view cart");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      setCurrentCart(response.data.cart);
    } catch (error) {}
    console.log(currentCart);
  };

  const totalPrice = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.quantity),
      0
    );
  }, [cart]);

  const modalClose = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    address: Yup.string().required("Delivery address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip: Yup.string()
      .matches(/^[0-9]{6}$/, "ZIP code must be 6 digits")
      .required("ZIP code is required"),
  });

  const handleSubmit = async (values) => {
    console.log(values);

    const orderData = {
      id: Date.now(),
      items: cart,
      total: totalPrice,
      ...values,
      paymentMode: payment,
      date: new Date().toISOString(),
    };

    if (!orderData.paymentMode) {
      toast.error("Select payment gateway");
      return;
    }
    try {
      const id = localStorage.getItem("id");
      if (!id) return;
      const userData = await axios.get(`http://localhost:5000/users/${id}`);
      const oldOrder = userData.data.order;
      await axios.patch(`http://localhost:5000/users/${id}`, {
        order: [...oldOrder, orderData],
      });
      await axios.patch(`http://localhost:5000/users/${id}`, { cart: [] });
      toast.success("Order Placed");
      setTimeout(() => {
        navigate("/order-history");
      }, 500);
    } catch (err) {}
  };

  return (
    <div className="cart container-md">
      <div className="row">
        <div className="left3 pt-0 p-2 col-12 col-sm-7">
          {currentCart.length === 0 ? (
            <div>
              <h3 className="fw-bold">No items in cart</h3>
            </div>
          ) : (
            <div>
              {currentCart.map((item) => (
                <CartItem key={item.id} product={item} />
              ))}
            </div>
          )}

          {/* map */}
        </div>
        <div className="p-2 p-md-0 col-12 col-sm-4">
          <div className="right3 p-4 ms-0 ms-md-3 bg-secondary-subtle">
            <h4>Cart Summary</h4>
            <p>Total Price : </p>
            <h1 className="fw-bold">₹{totalPrice}</h1>
            <Link to="/cart">
              <button
                className={`checkout-btn w-100 border-0 text-white rounded-2 py-2`}
                disabled={cartCount === 0}
                onClick={openModal}
              >
                Place Order
              </button>
            </Link>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content m-2 p-4 bg-white rounded-4 shadow">
            <h4 className="mb-3">Place Order</h4>
            <div className="form-container p-2 mt-2">
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  phone: "",
                  address: "",
                  city: "",
                  state: "",
                  zip: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  {/* Customer Details */}
                  <h5>Customer Details</h5>
                  <div className="position-relative mt-3">
                    <label className="form-label  position-absolute bg-white">
                      Full Name:
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="w-100 rounded-3 py-1"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="position-relative mt-3">
                    <label className="form-label  position-absolute bg-white">
                      Email Address:
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="w-100 rounded-3 py-1"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="position-relative mt-3">
                    <label className="form-label  position-absolute bg-white">
                      Phone Number:
                    </label>
                    <Field
                      type="tel"
                      name="phone"
                      className="w-100 rounded-3 py-1"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="error"
                    />
                  </div>

                  {/* Delivery Information */}
                  <h5 className="mt-3">Delivery Information</h5>
                  <div className="position-relative mt-3">
                    <label className="form-label  position-absolute bg-white">
                      Address:
                    </label>
                    <Field
                      as="textarea"
                      name="address"
                      className="w-100 rounded-3 py-1"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="position-relative mt-3">
                    <label className="form-label  position-absolute bg-white">
                      City:
                    </label>
                    <Field
                      type="text"
                      name="city"
                      className="w-100 rounded-3 py-1"
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className=" d-flex">
                    <div className="w-50 position-relative mt-3">
                      <label className="form-label  position-absolute bg-white">
                        State:
                      </label>
                      <Field
                        type="text"
                        name="state"
                        className="w-100 rounded-3 py-1"
                      />
                      <ErrorMessage
                        name="state"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="w-50 position-relative mt-3">
                      <label className="form-label  position-absolute bg-white">
                        PIN Code:
                      </label>
                      <Field
                        type="text"
                        name="zip"
                        className="w-100 rounded-3 py-1"
                      />
                      <ErrorMessage
                        name="zip"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="mt-3">Payment method</h4>
                    <div className="d-flex justify-content-between w-100">
                      <div
                        onClick={() => {
                          setPayment("UPI");
                        }}
                        className={`payment-img m-2 ${
                          payment === "UPI" && `active`
                        }`}
                      >
                        <img
                          src="https://uxdt.nic.in/wp-content/uploads/2020/06/Preview.png?x79383"
                          className="w-100 h-100"
                          alt=""
                        />
                      </div>
                      <div
                        onClick={() => {
                          setPayment("PAYPAL");
                        }}
                        className={`payment-img m-2 ${
                          payment === "PAYPAL" && `active`
                        }`}
                      >
                        <img
                          src="https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15.fit_lim.size_1050x591.v1602794215.png"
                          className="w-100 h-100"
                          alt=""
                        />
                      </div>
                      <div
                        onClick={() => {
                          setPayment("BITCOIN");
                        }}
                        className={`payment-img m-2 ${
                          payment === "BITCOIN" && `active`
                        }`}
                      >
                        <img
                          src="https://storage.googleapis.com/static-bitkubacademy-com/BTC_0b50b89be6.png"
                          className="w-100 h-100"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="float-end mt-3 px-4 py-1 border-1 rounded-3 proceed-btn"
                    >
                      Place Order
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
            <button
              className="close-btn border-0 mt-4 p-1 rounded-3 text-white"
              onClick={modalClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
