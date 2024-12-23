import React from "react";
import "./RelatedItems";
import ProductCard from "../ProductCard/ProductCard";
const RelatedItems = ({ product }) => {
  return (
    <div className="container-md">
      <h2 className="fw-bold mt-3">Relates Products</h2>
      <div className="row p-0 m-0">
        {product.length > 0 ? (
          product.map((item, index) => <ProductCard key={index} item={item} />)
        ) : (
          <h4>No related items</h4>
        )}
      </div>
    </div>
  );
};

export default React.memo(RelatedItems);
