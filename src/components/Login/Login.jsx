import React, { useContext } from "react";
import "./Login.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/Provider";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const { toggleAuth, setToggleAuth, setIsUserLogin, setId, setCartCount } =
    useContext(DataContext);

  const navigate = useNavigate();
  const initialLoginValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const onSubmit = async (values, { resetForm }) => {
    const user = await axios.get("http://localhost:5000/users", {
      params: { email: values.email, password: values.password },
    });
    if (user.data.length > 0) {
      localStorage.setItem("id", user.data[0].id);
      localStorage.setItem("name", user.data[0].name);
      console.log(localStorage.getItem("id"));
      setIsUserLogin(true);
      setId(user.data[0].id);
      toast.success("Loggin successful");
      setTimeout(() => {
        resetForm();

        navigate("/");
      }, 500);
    } else {
      toast.error("Wrong Email or Password");
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
            <label htmlFor="">Email</label>
            <Field
              className="login-input rounded-3 p-2"
              type="email"
              name="email"
              id="email"
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="d-flex flex-column text-black">
            <label htmlFor="">Password</label>
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
