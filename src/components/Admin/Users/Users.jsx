import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./Users.css";
import Modal from "../Modal/Modal.jsx";
import AdminCartCard from "../AdminCartCard/AdminCartCard.jsx";
import { TbShoppingCartX } from "react-icons/tb";
import { BsBagXFill } from "react-icons/bs";
import AdminOrderCard from "../AdminOrderCard/AdminOrderCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  setIsUserCartOpen,
  setIsUserOrderOpen,
} from "../../../Redux/AdminSlice/adminSlice.jsx";

const Users = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [userCart, setUserCart] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const { isUserCartOpen, isUserOrderOpen, users } = useSelector(
    (state) => state.admin
  );
  //   const {
  //   isUserCartOpen,
  //   isUserOrderOpen,
  //   setIsUserCartOpen,
  //   setIsUserOrderOpen,
  //   } = useContext(AdminContext);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const openUserCart = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/users/${id}`);
      setUserCart(data.cart);
      setSelectedUser(id);
      dispatch(setIsUserCartOpen(true));
    } catch (error) {
      console.log("error in fetching user orders", error);
    }
  };
  const openUserOrder = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/users/${id}`);
      setUserOrders(data.order);
      setSelectedUser(id);
      dispatch(setIsUserOrderOpen(true));
    } catch (error) {
      console.log("error in fetching user orders", error);
    }
  };
  const closeUserCart = () => {
    dispatch(setIsUserCartOpen(false));
    setSelectedUser(null);
    setUserCart([]);
  };
  const closeUserOrder = () => {
    dispatch(setIsUserOrderOpen(false));
    setSelectedUser(null);
    setUserOrders([]);
  };

  return (
    <div className="container-fluid p-0 mt-2">
      <div className="product-header   p-2 rounded-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="fw-semibold mb-0 mt-1">USERS</h3>
        </div>
        <div className="scrollable-table mt-2">
          <table className="users-table mt-2 w-100 table-border">
            <thead>
              <tr className="table-title">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Cart</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <button
                      onClick={() => {
                        openUserCart(user.id);
                      }}
                      className=" rounded-3 border-0 p-1 pt-2 bg-warning"
                    >
                      View Cart
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        openUserOrder(user.id);
                      }}
                      className="  rounded-3 border-0 p-1 pt-2"
                    >
                      View Orders
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isUserCartOpen} onClose={closeUserCart}>
        <h4>Cart</h4>
        <div className="cart-items">
          {userCart.length > 0 ? (
            userCart.map((product) => <AdminCartCard product={product} />)
          ) : (
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <TbShoppingCartX style={{ fontSize: "80px " }} />
                <h3 className="text-center text-danger">Cart Empty</h3>
              </div>
            </div>
          )}
        </div>
      </Modal>
      <Modal isOpen={isUserOrderOpen} onClose={closeUserOrder}>
        <h4>Orders</h4>
        <div className="user-orders">
          {userOrders.length > 0 ? (
            userOrders.map((order) => (
              <AdminOrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <BsBagXFill style={{ fontSize: "80px " }} />
                <h3 className="text-center text-danger">No orders</h3>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Users;
