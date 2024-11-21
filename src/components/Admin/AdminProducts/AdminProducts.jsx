import React, { useState, useEffect } from "react";
import "./AdminProducts.css";
import { TiFilter } from "react-icons/ti";
import axios from "axios";

const AdminProducts = () => {
  const [category, setCategory] = useState("All");
  const [productData, setProductData] = useState([]);
  console.log(category);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/products");

        category !== "All"
          ? setProductData(
              data.filter((product) => product.category === category)
            )
          : setProductData(data);
      } catch (error) {}
    };
    fetchProduct();
  }, [category]);

  return (
    <div className="container p-0 mt-2">
      <div className="product-header   p-2 rounded-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="fw-semibold mb-0 mt-1">
            {category.toUpperCase()} SHOESES
          </h3>
          <div className="bg-white p-1 rounded-3">
            <TiFilter className="fs-4 mb-1" />
            <select
              className="category-option border-0 rounded-3 bg-transparent"
              name="category"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All</option>
              <option value="casual">Casual</option>
              <option value="running">Running</option>
              <option value="hiking">Hiking</option>
              <option value="walking">Walking</option>
              <option value="skate">Skate</option>
            </select>
          </div>
        </div>
        <div className="scrollable-table mt-2">
          <table className=" mt-2 w-100 table-bordered">
            <tr className="table-title">
              <th>Title</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Model</th>
              <th>Color</th>
              <th>Category</th>
              <th>Quantity</th>
            </tr>
            {productData.map((item) => (
              <tr>
                <td>{item.title}</td>
                <td>{item.brand}</td>
                <td>{item.price}</td>
                <td>{item.discount}%</td>
                <td>{item.model}</td>
                <td>{item.color}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
