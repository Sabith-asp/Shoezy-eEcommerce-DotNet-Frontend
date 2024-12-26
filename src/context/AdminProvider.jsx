// import axios from "axios";
// import React, { useState, createContext, useEffect } from "react";
// import toast from "react-hot-toast";
// export const AdminContext = createContext();

// const AdminProvider = ({ children }) => {
//   const [users, setUsers] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isUserCartOpen, setIsUserCartOpen] = useState(false);
//   const [isUserOrderOpen, setIsUserOrderOpen] = useState(false);
//   const [blockedUsers, setBlockedUsers] = useState([]);
//   const [blockUpdater, setBlockUpdater] = useState(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/products");
//         setProducts(response.data);
//       } catch (error) {
//         console.log("fetching products from admin failed");
//       }
//     };
//     fetchProduct();
//   }, []);

//   useEffect(() => {
//     fetchUser();
//   }, [blockUpdater]);

//   console.log("admin context rerender");

//   const fetchUser = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:5000/users");
//       setUsers(data.filter((user) => user.status || user.status === undefined));

//       setBlockedUsers(data.filter((user) => user.status === false));
//     } catch (error) {
//       console.log("error in fetching users");
//     }
//   };

//   const editProduct = async (id, values) => {
//     console.log("values are", values, id);
//     try {
//       await axios.put(`http://localhost:5000/products/${id}`, values);
//       setIsEditModalOpen(false);
//       toast.success("Editing Successful");
//     } catch (error) {
//       console.log("error in editing product" || error.message);
//       toast.error("error in editing product");
//     }
//   };
//   const addProduct = async (product) => {
//     console.log("adding product", product);

//     try {
//       await axios.post("http://localhost:5000/products", product);
//       setIsAddModalOpen(false);
//       toast.success("Product added");
//     } catch (error) {
//       console.log("error in adding product" || error.message);
//       toast.error("error in adding product");
//     }
//   };

//   const deleteProduct = async (id) => {
//     try {
//       const deleted = await axios.delete(
//         `http://localhost:5000/products/${id}`
//       );
//       setProducts((prev) => prev.filter((item) => item.id !== id));
//       console.log("product deleted", deleted);
//       toast.success("Product deleted");
//     } catch (error) {
//       console.log("error in deleteting product");
//       toast.error("error in deleteting product");
//     }
//   };

//   const userStatus = async (id, status = true) => {
//     try {
//       await axios.patch(`http://localhost:5000/users/${id}`, {
//         status: !status,
//       });
//       toast.success(`User with ID:${id} status changed`);
//     } catch (error) {
//       console.log("error in changing status of user");
//       toast.error("error in changing status of user");
//     }
//   };

//   return (
//     <AdminContext.Provider
//       value={{
//         users,
//         blockedUsers,
//         blockUpdater,
//         setBlockUpdater,
//         products,
//         setUsers,
//         setBlockedUsers,
//         userStatus,
//         editProduct,
//         addProduct,
//         deleteProduct,
//         isUserCartOpen,
//         isUserOrderOpen,
//         setIsUserCartOpen,
//         setIsUserOrderOpen,
//         isEditModalOpen,
//         setIsEditModalOpen,
//         isAddModalOpen,
//         setIsAddModalOpen,
//       }}
//     >
//       {children}
//     </AdminContext.Provider>
//   );
// };

// export default AdminProvider;
