import React, { useContext, useEffect, useState } from "react";
import "./ProductDetails.css";
import { FaStar } from "react-icons/fa";
import RelatedItems from "../RelatedItems/RelatedItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../context/CartProvider";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "../../Redux/CartSlice/CartSlice";
import api from "../../api/api";

const ProductDetails = () => {
  //   const { addToCart } = useContext(CartContext);
  const [productDetail, setProductDetail] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const { id } = useParams();

  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  const handleAddToCart = (productid) => {
    if (!accessToken) {
      toast.error("Please log in to add products to the cart");
      return;
    }

    dispatch(addToCart(productid));
  };

  useEffect(() => {
    const fetchSpecific = async () => {
      try {
        const response = await api.get(`/api/Product/user/${id}`);

        setProductDetail(response?.data?.data);
        const productdata = response?.data?.data;
        console.log("fetch specific working");
        console.log(productdata);

        // if (productdata.category) {
        //   console.log("fetching realted");

        //   fetchRelated();
        // }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchSpecific();
  }, [id]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!productDetail.category || !productDetail.id) return;

      try {
        console.log("category is", productDetail.category);
        const response = await api.get(
          `api/Product/get-related?id=${productDetail.id}&category=${productDetail.category}`
        );
        console.log(
          "fetching related products",
          response.data?.data?.slice(-10)
        );
        setRelatedProduct(response.data?.data?.slice(-10));
      } catch (error) {}
    };

    fetchRelated();
  }, [productDetail]);

  return (
    <>
      <div className="product-details container-md">
        <div className="row d-flex flex-column flex-md-row align-items-center">
          <div className="left1 p-0 p-md-3  col-11 col-md-4">
            <div className="left1-sub">
              <img
                src={productDetail.image}
                className="w-100 border-1 border-black object-fit-cover"
              />
            </div>

            {/* product sub images */}
          </div>
          <div className="right1 p-0 text-start ms-0 ms-md-5 col-11 col-md-7  d-flex flex-column justify-content-center">
            <h2 className="fw-bold mt-3 mt-md-0">{productDetail.title}</h2>
            <div className="rating">
              <span className="fs-4 fw-bold text-danger">
                {productDetail.discount}%
              </span>{" "}
              discount
            </div>
            <h5 className="mt-3">{productDetail.brand}</h5>
            <h6 className="mt-3">Model: {productDetail.model}</h6>
            <h5 className="mt-3">Details:</h5>
            <p>{productDetail.description}</p>
            <h4 className="rate fw-bold">₹ {productDetail.price}</h4>
            <div className="quantity">
              {/* <Quantity qty={quantity} setQty={setQuantity} /> */}
            </div>
            <span>
              <button
                onClick={() => {
                  handleAddToCart(productDetail.id);
                }}
                className="fs-5 px-3 add-to-cart-btn mt-3 float-end float-md-start rounded"
              >
                Add to Cart
              </button>
            </span>
          </div>
        </div>
      </div>
      <hr />
      <RelatedItems product={relatedProduct} />
    </>
  );
};

export default ProductDetails;
