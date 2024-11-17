import React, { useContext } from "react";
import { DataContext } from "../../context/Provider";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

const AuthLayout = () => {
  const { toggleAuth, setToggleAuth } = useContext(DataContext);
  return (
    <div className="login-container vh-100 d-flex align-items-center justify-content-center">
      {toggleAuth ? <Login /> : <SignUp />}
    </div>
  );
};

export default AuthLayout;
