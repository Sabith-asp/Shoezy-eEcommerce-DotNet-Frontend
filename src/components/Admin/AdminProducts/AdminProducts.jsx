import React, { useState, useEffect, useContext } from "react";
import "./AdminProducts.css";
import { TiFilter } from "react-icons/ti";
import axios from "axios";
import Loader from "../../Loader/Loader";
import Modal from "../Modal/Modal";
import EditForm from "../ProductForm/ProductForm";
import {
  deleteProduct,
  fetchCategory,
  fetchProducts,
  setIsAddModalOpen,
  setIsEditModalOpen,
} from "../../../Redux/AdminSlice/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../api/api";
import toast from "react-hot-toast";

const AdminProducts = () => {
  //   const {
  //     products,
  //     isEditModalOpen,
  //     setIsEditModalOpen,
  //     isAddModalOpen,
  //     setIsAddModalOpen,
  //     deleteProduct,
  //   } = useContext(AdminContext);
  const dispatch = useDispatch();
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { products, isEditModalOpen, isAddModalOpen, categories } = useSelector(
    (state) => state.admin
  );

  const openEditModal = (id) => {
    console.log(id);
    setSelectedProductId(id);
    dispatch(setIsEditModalOpen(true));
  };

  const closeEditModal = () => {
    dispatch(setIsEditModalOpen(false));
  };

  const openAddModal = () => {
    dispatch(setIsAddModalOpen(true));
  };
  const closeAddModal = () => {
    dispatch(setIsAddModalOpen(false));
  };

  console.log(category, "current category");
  console.log("categories", categories);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (category == "All") {
          await dispatch(fetchProducts());
          setLoading(false);
        } else {
          const response = await api.get(`/api/Product/category/${category}`);
          console.log(response?.data?.data);

          setProductData(response?.data?.data);
          setLoading(false);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        setCategory("All");
        console.log(error?.response?.data?.message);
      }
    };
    fetchProduct();
    dispatch(fetchCategory());
  }, [category]);
  if (loading) return <Loader />;

  return (
    <div className="container-fluid p-0 mt-2 position-relative">
      <div className="product-header   p-2 rounded-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <h3 className="fw-semibold mb-0 mt-1">
              {category.toUpperCase()} SHOESES
            </h3>
          </div>
          <div className="d-flex">
            <div>
              <button
                onClick={openAddModal}
                className="add-product bg-warning  fw-bold ms-3 me-2 px-4 py-1 pt-2 rounded-3 border-0"
              >
                Add
              </button>
            </div>
            <div className="bg-white p-1 rounded-3 d-flex">
              <TiFilter className="fs-4 mb-1" />
              <select
                className="category-option border-0 fw-bold rounded-3 bg-transparent"
                name="category"
                value={category}
                id="category"
                onChange={(e) => {
                  setLoading(true);
                  setCategory(e.target.value);
                }}
              >
                <option value="All">All</option>
                {categories?.map((category) => (
                  <option style={{ width: "40px" }} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="scrollable-table mt-2">
          <table className="product-table mt-2 w-100 table-border">
            <thead>
              <tr className="table-title">
                {/* {productData.length > 0 &&
                  Object.keys(productData[0]).map((head, index) => (
                    <th key={index}>{head.toUpperCase()}</th>
                  ))} */}
                <th>Title</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Model</th>
                <th>Color</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>Changes</th>
              </tr>
            </thead>
            <tbody>
              {}
              {category === "All"
                ? products
                    ?.slice()
                    .reverse()
                    .map((item) => (
                      <tr key={item?.id}>
                        <td>{item?.title}</td>
                        <td>{item?.brand}</td>
                        <td>{item?.price}</td>
                        <td>{item?.discount}%</td>
                        <td>{item?.model}</td>
                        <td>{item?.color}</td>
                        <td>{item?.category}</td>
                        <td>{item?.quantity}</td>
                        <td>
                          <img
                            className="product-img rounded-4"
                            src={item?.image}
                            alt=""
                          />
                        </td>
                        <td className="d-flex flex-column justify-content-center align-items-center">
                          <button
                            onClick={() => openEditModal(item.id)}
                            className="admin-btn edit rounded-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => dispatch(deleteProduct(item.id))}
                            className="admin-btn delete rounded-3"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                : productData
                    ?.slice()
                    .reverse()
                    .map((item) => (
                      <tr key={item?.id}>
                        <td>{item?.title}</td>
                        <td>{item?.brand}</td>
                        <td>{item?.price}</td>
                        <td>{item?.discount}%</td>
                        <td>{item?.model}</td>
                        <td>{item?.color}</td>
                        <td>{item?.category}</td>
                        <td>{item?.quantity}</td>
                        <td>
                          <img
                            className="product-img rounded-4"
                            src={item?.image}
                            alt=""
                          />
                        </td>
                        <td className="d-flex flex-column justify-content-center align-items-center">
                          <button
                            onClick={() => openEditModal(item.id)}
                            className="admin-btn edit rounded-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => dispatch(deleteProduct(item.id))}
                            className="admin-btn delete rounded-3"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <h4 className="">Edit product</h4>
        <div>
          <EditForm productId={selectedProductId} />
        </div>
      </Modal>
      <Modal isOpen={isAddModalOpen} onClose={closeAddModal}>
        <h4 className="">Add product</h4>
        <div>
          <EditForm />
        </div>
      </Modal>
    </div>
  );
};

export default AdminProducts;
