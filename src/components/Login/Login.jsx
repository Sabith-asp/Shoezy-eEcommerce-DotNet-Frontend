import React, { useContext, useEffect } from "react";
import "./Login.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/Provider";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchUser, login } from "../../Redux/UserSlice/userSlice";
import api from "../../api/api";
import { fetchCart } from "../../Redux/CartSlice/CartSlice";

const Login = () => {
  const { toggleAuth, setToggleAuth } = useContext(DataContext);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const initialLoginValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object({
    username: Yup.string()
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      )
      .min(3, "Username must be at least 3 characters")
      .max(15, "Username cannot be more than 15 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const onSubmit = async (values, { resetForm }) => {
    try {
      const { data } = await api.post("/api/users/login", {
        ...values,
      });
      console.log(data);

      localStorage.setItem("accessToken", data?.data?.accessToken);
      localStorage.setItem("refreshToken", data?.data?.refreshToken);
      toast.success("User Login successful");
      setTimeout(() => {
        resetForm();
        navigate("/");
      }, 100);
      dispatch(fetchUser());
      dispatch(fetchCart());
    } catch (error) {
      if (error.response) {
        console.log(error);

        toast.error(`${error?.response?.data?.message}`);
      }
    }
  };
  return (
    <>
      <Formik
        initialValues={initialLoginValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="login p-4  rounded-5 ">
          <div className="d-flex flex-column text-black">
            <label htmlFor="email">Username</label>
            <Field
              className="login-input rounded-3 p-2"
              type="text"
              name="username"
              id="username"
            />
            <ErrorMessage name="username" component="div" className="error" />
          </div>
          <div className="d-flex flex-column text-black">
            <label htmlFor="password">Password</label>
            <Field
              className="login-input rounded-3 p-2"
              type="password"
              name="password"
              id="password"
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <button
            type="submit"
            className="login-btn w-100 mt-4 p-2 border-0 rounded-3"
          >
            Login
          </button>
          <hr />
          <div
            className="login-btn w-100 mt-4 p-2 border-0 rounded-3 text-center"
            onClick={() => {
              setToggleAuth(!toggleAuth);
            }}
          >
            Sign Up
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
