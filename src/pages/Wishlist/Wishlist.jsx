import React, { useEffect, useState, useContext } from "react";
// import "../Products/Products.css";
import { CartContext } from "../../context/CartProvider";
import axios from "axios";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TbShoppingCartOff } from "react-icons/tb";

const Wishlist = () => {
  const { products, loading } = useSelector((state) => state.wishlist);

  return (
    <section className="container-fluid products pb-3">
      <div className="container-md ">
        <div className="row">
          {loading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <div className="col-6 col-sm-4 col-md-3 p-1 p-md-2">
                <div key={index} className="card w-100 p-2 rounded-4">
                  <div className="card__skeleton card__description"></div>
                  <div className="card__skeleton card__title"></div>
                  <div className="card__skeleton card__title"></div>
                </div>
              </div>
            ))
          ) : products == null || products.length == 0 ? (
            <div className="d-flex flex-column vh-100 vw-100 justify-content-center align-items-center">
              <TbShoppingCartOff className=" fs-1" />
              <h1>No products found</h1>
            </div>
          ) : (
            products?.map((product) => (
              <ProductCard key={product.id} item={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
