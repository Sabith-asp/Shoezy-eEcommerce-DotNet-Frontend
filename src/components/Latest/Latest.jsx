import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/ProductSlice/productSlice";

const Latest = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [latestProductsError, setLatestProductsError] = useState(false);
  const [latestProductsLoading, setLatestProductsLoading] = useState(true);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setLatestProducts(products?.data?.slice(-20));
  }, [products]);

  return (
    <section className="container-md p-0">
      <h1 className="fw-bold text-center my-2 my-md-3">LatesT</h1>
      <div className="row p-0 m-0">
        {latestProducts?.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
      <hr />
    </section>
  );
};

export default Latest;
