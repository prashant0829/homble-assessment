import React from "react";

const ProductImage = ({ imageUrl, productName }) => {
  return (
    <div className="col-lg-5 col-md-6 mb-4">
      <img src={imageUrl} className="img-fluid" alt={productName} />
    </div>
  );
};

export default ProductImage;
