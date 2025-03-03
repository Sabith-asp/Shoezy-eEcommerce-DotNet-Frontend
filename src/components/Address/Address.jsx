import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaEnvelope,
  FaPhone,
  FaHome,
  FaMapMarkerAlt,
  FaCity,
} from "react-icons/fa";
import "./Address.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { fetchUserAddress } from "../../Redux/UserSlice/userSlice";
import Razorbutton from "../Razorpay/Razorbutton";
import { FaPlusSquare } from "react-icons/fa";
import UserModal from "../UserModal/UserModal";
import AddressForm from "./AddressForm";

const Address = () => {
  const [addressAdd, setAddressAdd] = useState(false);
  const { address } = useSelector((state) => state.user);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);

  const handleSelect = (addressId) => {
    setSelectedAddress(addressId);
  };

  useEffect(() => {
    dispatch(fetchUserAddress());
    console.log("user address");
  }, []);

  const closeAddressAdd = () => {
    setAddressAdd(false);
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="col-12 address p-3 bg-secondary-subtle rounded-5 d-flex flex-column position-relative justify-content-center align-items-center">
        <h2 className="mb-3">Select an Address</h2>
        <div className="w-100 mb-3">
          <button
            onClick={() => setAddressAdd(true)}
            className="p-2 px-3 text-white bg-black border-0 rounded-3 float-end"
          >
            <FaPlusSquare className="" />
          </button>
          <UserModal isOpen={addressAdd} onClose={closeAddressAdd}>
            <AddressForm close={closeAddressAdd} />
          </UserModal>
        </div>

        {address.length == 0 ? (
          <h5 className="text-center text-danger">Address not available</h5>
        ) : (
          <div className=" row">
            {address.map((address) => (
              <div key={address.addressId} className="col-12 col-md-6 col-lg-3">
                <div
                  className={`  p-3 mb-3 rounded-5 ${
                    selectedAddress === address.addressId
                      ? "bg-secondary text-white shadow"
                      : "bg-light shadow"
                  }`}
                  onClick={() => handleSelect(address.addressId)}
                  style={{
                    cursor: "pointer",
                    transition: "background 0.3s, box-shadow 0.3s",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      checked={selectedAddress === address.addressId}
                      onChange={() => handleSelect(address.addressId)}
                      className="me-2"
                    />
                    <strong>{address.name}</strong>
                  </div>
                  <div className="mt-2">
                    <p className="mb-1">
                      <FaEnvelope className="me-2" /> {address.email}
                    </p>
                    <p className="mb-1">
                      <FaPhone className="me-2" /> {address.phone}
                    </p>
                    <p className="mb-1">
                      <FaHome className="me-2" /> {address.houseName}
                    </p>
                    <p className="mb-1">
                      <FaMapMarkerAlt className="me-2" /> {address.place}
                    </p>
                    <p className="mb-1">
                      <FaCity className="me-2" />
                      {address.city}, {address.state} ({address.pincode})
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {}

        <Razorbutton
          address={address}
          amount={cart?.totalPrice}
          addressId={selectedAddress}
        />
      </div>
    </div>
  );
};

export default Address;
