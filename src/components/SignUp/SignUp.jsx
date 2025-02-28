import React, { useContext } from "react";
import "./SignUp.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { DataContext } from "../../context/Provider";
import toast, { Toaster } from "react-hot-toast";
import api from "../../api/api";

const SignUp = () => {
  const { toggleAuth, setToggleAuth } = useContext(DataContext);
  const initialSignUpValues = {
    name: "",
    email: "",
    phoneno: "",
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneno: Yup.string()
      .min(10, "Phone number must be at least 10 numbers")
      .max(10, "Phone number must be maximum 10 numbers")
      .required("Phone number is required"),
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
    console.log("signup started");
    console.log(values);
    const updateUser = async (values) => {
      try {
        const response = await api.post(`/api/users/signup`, values);
        console.log(response);
        toast.success(response?.data?.message);
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response);
          toast.error(error.response.data.message || "Something went wrong!");
        }
      }
    };
    updateUser(values);
    setToggleAuth(!toggleAuth);

    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialSignUpValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="login p-4  rounded-5">
          <div className="d-flex flex-column text-black">
            <label htmlFor="">Name:</label>
            <Field
              className="login-input rounded-3 p-2"
              type="name"
              name="name"
              id="name"
            />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div className="d-flex flex-column text-black">
            <label htmlFor="">Email:</label>
            <Field
              className="login-input rounded-3 p-2"
              type="email"
              name="email"
              id="email"
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="d-flex flex-column text-black">
            <label htmlFor="phone">Phone:</label>
            <Field
              className="login-input rounded-3 p-2"
              type="text"
              name="phoneno"
              id="phone"
            />
            <ErrorMessage name="phoneno" component="div" className="error" />
          </div>

          <div className="d-flex flex-column text-black">
            <label htmlFor="username">Username:</label>
            <Field
              className="login-input rounded-3 p-2"
              type="text"
              name="username"
              id="username"
            />
            <ErrorMessage name="username" component="div" className="error" />
          </div>

          <div className="d-flex flex-column text-black">
            <label htmlFor="">Password:</label>
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
            Sign Up
          </button>
          <hr />
          <div
            className="login-btn w-100 mt-4 p-2 border-0 rounded-3 text-center"
            onClick={() => {
              setToggleAuth(!toggleAuth);
            }}
          >
            Login
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default SignUp;
