import React from "react";
import "./RelatedItems";
import ProductCard from "../ProductCard/ProductCard";
const RelatedItems = ({ product }) => {
  console.log(product);

  return (
    <div className="container-md">
      <h2 className="fw-bold mt-3">Relates Products</h2>
      <div className="row p-0 m-0">
        {product.map((item, index) => (
          <ProductCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(RelatedItems);
