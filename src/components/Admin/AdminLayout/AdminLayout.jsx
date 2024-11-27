import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { IoMdCloseCircle, IoIosArrowDropright } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import "./AdminLayout.css";
import { AiFillProduct } from "react-icons/ai";
import { FaUserSlash, FaCircleUser } from "react-icons/fa6";
import { MdHome } from "react-icons/md";
import { BiSolidError, BiSolidPurchaseTag } from "react-icons/bi";
// import "react-pro-sidebar/dist/css/styles.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(
    window.matchMedia("(max-width: 800px)").matches
  );
  const adminId = localStorage.getItem("adminId");
  useEffect(() => {
    if (adminId) {
      setIsAdminLogin(true);
    }
  }, [adminId]);
  if (!adminId)
    return (
      <div className=" vh-100 vw-100 d-flex flex-column align-items-center justify-content-center">
        <BiSolidError className="text-warning" style={{ fontSize: "130px" }} />
        <h1>Oops!</h1>
        <h4 className="text-danger">No access to admin</h4>
      </div>
    );

  const adminLogout = () => {
    localStorage.removeItem("adminId");
    navigate("/");
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",

        minHeight: "400px",
      }}
    >
      <Sidebar
        toggled={toggled}
        customBreakPoint="800px"
        onBreakPoint={setBroken}
        style={{ background: "var(--primary-color)", height: "100%" }}
      >
        <div className="admin-header d-flex justify-content-between align-items-center m-2 rounded-4">
          <h3 className="p-1 ps-3 mt-3 fw-bold text-white">ShoesY Admin</h3>
          {broken && (
            <button
              className="sb-button m-2 border-0 rounded-3 text-danger"
              onClick={() => setToggled(!toggled)}
            >
              <IoMdCloseCircle />
            </button>
          )}
        </div>
        <Menu>
          <MenuItem component={<Link to="/admin" />}>
            <MdHome className="fs-2" />
            <span className="fw-medium ms-1">Home</span>
          </MenuItem>
          <MenuItem component={<Link to="/admin/orders" />}>
            <BiSolidPurchaseTag className="fs-2" />
            <span className="fw-medium ms-1">Orders</span>
          </MenuItem>
          <MenuItem component={<Link to="/admin/products" />}>
            <AiFillProduct className="fs-2" />
            <span className="fw-medium ms-1">Products</span>
          </MenuItem>
          <MenuItem component={<Link to="/admin/users" />}>
            <FaCircleUser className="fs-3" />
            <span className="fw-medium ms-1">Users</span>
          </MenuItem>
          <MenuItem component={<Link to="/admin/block" />}>
            <FaUserSlash className="fs-3" />
            <span className="fw-medium ms-1 ">Block</span>
          </MenuItem>
        </Menu>
      </Sidebar>
      <main
        style={{
          width: "100%",
          padding: 10,
          background: "white",
        }}
      >
        <div>
          <div className="admin-nav d-flex w-100  p-2 rounded-4">
            {broken && (
              <button
                className="sb-button border-0 rounded-3"
                onClick={() => setToggled(!toggled)}
              >
                <IoIosArrowDropright /> <span className="">Menu</span>
              </button>
            )}
            <div className="d-flex ms-auto align-items-center">
              {isAdminLogin && (
                <button
                  onClick={adminLogout}
                  className="border-0 text-white fw-bold rounded-3 bg-danger"
                >
                  Logout
                </button>
              )}

              <span className="fs-5 mt-1 fw-medium ms-1 text-white">Admin</span>
              <MdAdminPanelSettings className="fs-1 text-white" />
            </div>
          </div>

          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
