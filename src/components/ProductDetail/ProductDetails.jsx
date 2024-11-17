import React, { useContext, useEffect, useState } from "react";
import "./ProductDetails.css";
import { FaStar } from "react-icons/fa";
import RelatedItems from "../RelatedItems/RelatedItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../context/CartProvider";

const ProductDetails = () => {
  const { addToCart } = useContext(CartContext);
  const [productDetail, setProductDetail] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchSpecific = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );

        setProductDetail(response.data);
      } catch (error) {}
    };
    fetchSpecific();
  }, [id]);
  useEffect(() => {
    const fetchRelated = async () => {
      if (!productDetail.category || !productDetail.id) return;
      try {
        const response = await axios.get(`http://localhost:5000/products/`);
        const related = response.data.filter(
          (product) =>
            product.category === productDetail.category &&
            product.id !== productDetail.id
        );
        setRelatedProduct(related.slice(-10));
      } catch (error) {}
    };
    fetchRelated();
  }, [productDetail.category, productDetail.id]);

  //   useEffect(() => {
  //     const fetchProductAndRelated = async () => {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:5000/products/${id}`
  //         );
  //         const product = response.data;
  //         setProductDetail(product);

  //         // Fetch related products
  //         const relatedResponse = await axios.get(
  //           `http://localhost:5000/products/`
  //         );
  //         const related = relatedResponse.data.filter(
  //           (p) => p.category === product.category && p.id !== product.id
  //         );
  //         setRelatedProduct(related.slice(-10));
  //       } catch (error) {
  //         console.error("Error fetching product or related products:", error);
  //       }
  //     };

  //     fetchProductAndRelated();
  //   }, [id]);
  console.log("heloooooooooooo");

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
              {productDetail.discount}
              <FaStar className="text-warning ms-2 mb-1" />
            </div>
            <h6 className="mt-3">{productDetail.brand}</h6>
            <h5 className="mt-3">Details:</h5>
            <p>{productDetail.description}</p>
            <h4 className="rate fw-bold">₹ {productDetail.price}</h4>
            <div className="quantity">
              {/* <Quantity qty={quantity} setQty={setQuantity} /> */}
            </div>
            <span>
              <button
                onClick={() => {
                  addToCart(productDetail);
                }}
                className="fs-5 px-3 add-to-cart-btn mt-3 float-end float-md-start rounded"
              >
                Add to Cart
              </button>
            </span>
          </div>
        </div>
      </div>
      <RelatedItems product={relatedProduct} />
    </>
  );
};

export default ProductDetails;
