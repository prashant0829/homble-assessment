import React from "react";
import AccordionSection from "./AccordianSection";

const ProductDetails = ({ product }) => {
  return (
    <div className="col-lg-7 col-md-6">
      <h2 className="mb-3">{product.name}</h2>
      <p>
        <strong>Price:</strong> &#8377;{product.selling_price}
      </p>
      <div className="accordion" id="accordionExample">
        <AccordionSection
          title="Description"
          content={product.description}
          type={"Data"}
        />
        <AccordionSection
          title="Allergen Info"
          content={product.allergen_info}
          type={"Data"}
        />
        <AccordionSection
          title="Usage Instructions"
          content={product.cooking_instruction}
          type={"Data"}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
