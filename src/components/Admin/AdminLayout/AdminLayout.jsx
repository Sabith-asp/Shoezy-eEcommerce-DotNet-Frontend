import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Outlet } from "react-router-dom";
import { IoMdCloseCircle, IoIosArrowDropright } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import "./AdminLayout.css";
import { AiOutlineProduct } from "react-icons/ai";
import { LuUserCircle } from "react-icons/lu";
import { FaUserSlash } from "react-icons/fa6";
// import "react-pro-sidebar/dist/css/styles.css";

const AdminLayout = () => {
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(
    window.matchMedia("(max-width: 800px)").matches
  );

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
        style={{ background: "var(--primary-color)" }}
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
          <MenuItem>
            <AiOutlineProduct className="fs-2" />
            <span className="fw-medium ms-1">Products</span>
          </MenuItem>
          <MenuItem>
            <LuUserCircle className="fs-3" />
            <span className="fw-medium ms-1">Users</span>
          </MenuItem>
          <MenuItem>
            <FaUserSlash className="fs-3" />
            <span className="fw-medium ms-1 ">Blocked</span>
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
