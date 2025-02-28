import React, { useEffect, useState, useContext } from "react";
import "./Products.css";
import { CartContext } from "../../context/CartProvider";
import axios from "axios";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/api";
import toast from "react-hot-toast";
import { fetchProducts } from "../../Redux/ProductSlice/productSlice";

const Products = () => {
  //   const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useParams();

  const { products } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (category === "All") {
          dispatch(fetchProducts());
        } else {
          const response = await api.get(`api/Product/category/${category}`);
          setData(response?.data?.data);
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
        navigate("/");
        setError(error.message || "error in fetching products");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

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
            : products?.data?.map((product) => (
                <ProductCard key={product.id} item={product} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
