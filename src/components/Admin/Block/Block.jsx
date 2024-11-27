import React, { useContext, useEffect, useState } from "react";
import "./Block.css";
import { AdminContext } from "../../../context/AdminProvider";

const Block = () => {
  const {
    users,
    userStatus,
    setUsers,
    blockUpdater,
    setBlockUpdater,
    blockedUsers,
    setBlockedUsers,
  } = useContext(AdminContext);

  return (
    <div className="container-fluid p-0 mt-2">
      <div className="blocked-users   p-2 rounded-4">
        <h3 className="fw-semibold mb-0 mt-1">Block User</h3> <hr />
        <div>
          <h4 className="mt-2 text-danger fw-semibold">Blocked Users List</h4>
          <div className="scrollable-table mt-2">
            <table className=" mt-2 w-100 table-border">
              <thead>
                <tr className="table-title">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {blockedUsers.length > 0 ? (
                  blockedUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          onClick={() => {
                            setBlockedUsers((prev) =>
                              prev.filter((item) => item.id !== user.id)
                            );
                            userStatus(user.id, user.status);
                            setBlockUpdater(!blockUpdater);
                          }}
                          className=" rounded-3 border-0 p-1 px-2 pt-2 bg-warning"
                        >
                          Unblock
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>
                      <h4 className="mt-3">No blocked users</h4>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <h4 className="mt-2 fw-semibold">Users List</h4>
          <div className="block-table mt-2">
            <table className=" mt-2 w-100 table-border">
              <thead>
                <tr className="table-title">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        onClick={() => {
                          setBlockedUsers((prev) => [...prev, user]);
                          userStatus(user.id);
                          setBlockUpdater(!blockUpdater);
                        }}
                        className=" rounded-3 border-0 px-3 p-1 pt-2 bg-warning"
                      >
                        Block
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Block;
