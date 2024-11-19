import React, { useEffect, useState, useContext } from "react";
import "./Products.css";
import { CartContext } from "../../context/CartProvider";
import axios from "axios";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useParams } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        console.log(response);

        const filtered = response.data.filter((item) => item.brand == category);
        console.log(filtered);

        category === "All" ? setData(response.data) : setData(filtered);
      } catch (error) {
        setError(error.message || "error in fetching products");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);
  console.log(data);
  console.log(category);

  //   if (category) {
  //     const filtered = data.filter((item) => item.brand === category);
  //     setData(filtered);
  //   }

  return (
    <section className="container-fluid products pb-3">
      <div className="container-md ">
        <div className="row ">
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="card">
                  <div className="card__skeleton card__description"> </div>
                  <div className="card__skeleton card__title"></div>
                  <div className="card__skeleton card__title"></div>
                  <div className="card__skeleton card__title"></div>
                </div>
              ))
            : data.map((product) => (
                <ProductCard key={product.id} item={product} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
