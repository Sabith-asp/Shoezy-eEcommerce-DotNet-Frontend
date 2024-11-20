import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Outlet } from "react-router-dom";
// import "react-pro-sidebar/dist/css/styles.css";

const AdminLayout = () => {
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(
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
        <h3 className="p-2 fw-bold">ShoesY Admin</h3>
        <Menu>
          <MenuItem> Documentation</MenuItem>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
          <MenuItem> Examples</MenuItem>
        </Menu>
      </Sidebar>
      <main style={{ padding: 10, background: "var(--primary-color)" }}>
        <div>
          {broken && (
            <button className="sb-button" onClick={() => setToggled(!toggled)}>
              Toggle
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
