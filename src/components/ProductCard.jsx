import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <>
      <Link
        key={product.id}
        className="col-12 col-xs-12 col-md-6 col-lg-4 product-card"
        to={`/product/${product.id}`}
      >
        <div className="card shadow-sm">
          <img src={product.productImage} className="card-img-top" alt="..." />
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-end">
              <h5 className="card-title">{product.name}</h5>
              <h6>&#8377;{product.selling_price}</h6>
            </div>
            <p className="card-text text-secondary description-text">
              {product.description}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
