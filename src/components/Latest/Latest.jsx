import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Latest = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [latestProductsError, setLatestProductsError] = useState(false);
  const [latestProductsLoading, setLatestProductsLoading] = useState(true);
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        console.log(response.data.slice(-20));

        setLatestProducts(response.data.slice(-20));
      } catch (error) {
        setLatestProductsError(
          error.message || "Error in fetching latest products"
        );
      } finally {
        setLatestProductsLoading(false);
      }
    };
    fetchLatest();
  }, []);
  console.log(latestProducts);

  return (
    <section className="container-md p-0">
      <h1 className="fw-bold text-center my-2 my-md-3">LatesT</h1>
      <div className="row p-0 m-0">
        {/* {latestProducts.map((item, index) => (
          <ProductCard key={index} item={item} />
        ))} */}
        {latestProducts.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Latest;
