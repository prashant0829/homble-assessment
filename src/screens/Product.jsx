import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useApi from "../customHooks/useApi"; // Adjust the path as necessary
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductImage from "../components/ProductImage";
import ProductDetails from "../components/ProductDetails";
import AccordionSection from "../components/AccordianSection";

const ProductDetail = () => {
  const { id } = useParams();
  const { get, loading, error } = useApi();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id, get]);

  if (error) return "Something went wrong!";
  return (
    <div className="container mt-4">
      <div className="row">
        {loading || !product ? (
          <>
            <div className="col-lg-5 col-md-6 mb-4">
              <Skeleton height={300} width="100%" />
            </div>

            <div className="col-lg-7 col-md-6">
              <Skeleton height={40} width="50%" className="mb-3" />
              <Skeleton height={30} width="10%" className="mb-3" />
              <div className="accordion" id="accordionSkeleton">
                {[1, 2, 3].map((index) => (
                  <AccordionSection
                    key={index}
                    title={<Skeleton height={40} />}
                    content={<Skeleton count={3} />}
                    type={"Skeleton"}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <ProductImage
              imageUrl={product.productImage}
              productName={product.name}
            />
            <ProductDetails product={product} />
            <div className="col-lg-7 col-md-6"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
