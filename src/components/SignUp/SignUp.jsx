import React, { useContext } from "react";
import "./SignUp.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { DataContext } from "../../context/Provider";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const { toggleAuth, setToggleAuth } = useContext(DataContext);
  const initialSignUpValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    const existingUser = await axios.get("http://localhost:5000/users", {
      params: { email: values.email },
    });
    if (existingUser.data.length > 0) {
      toast.error("Email id is already exist. Login Now");
      resetForm();
      return;
    }
    const cart = [],
      order = [];
    console.log(values);
    const updateUser = async (values) => {
      const users = await axios.post("http://localhost:5000/users", {
        ...values,
        cart,
        order,
      });
    };
    updateUser(values);
    setIsLogin(!isLogin);
    toast.success("Sign Up Success Login Now!");
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
