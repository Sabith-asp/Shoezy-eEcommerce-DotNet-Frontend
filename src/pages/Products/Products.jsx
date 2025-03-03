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
  const [data, setData] = useState([]);
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
          const response = await api.get(`/api/Product/brand/${category}`);
          console.log(response);

          setData(response?.data?.data);
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
        navigate("/All");
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
                <div key={index} className="col-6 col-sm-4 col-md-3 p-1 p-md-2">
                  <div className="card w-100 p-2 rounded-4">
                    <div className="card__skeleton card__description"></div>
                    <div className="card__skeleton card__title"></div>
                    <div className="card__skeleton card__title"></div>
                  </div>
                </div>
              ))
            : category == "All"
            ? products?.data?.map((product) => (
                <ProductCard key={product.id} item={product} />
              ))
            : data?.map((product) => (
                <ProductCard key={product.id} item={product} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
