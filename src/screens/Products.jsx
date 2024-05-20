import React, { useEffect, useState } from "react";
import useApi from "../customHooks/useApi"; // Adjust the path as necessary
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCard from "../components/ProductCard";
import AddProductModal from "../components/AddProductModal";

const Products = () => {
  const { get, post, loading, error, addProductLoading } = useApi();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    allergenInfo: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await get("/products");
        // Sort products based on selling price
        data.sort((a, b) => a.selling_price - b.selling_price);
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [get]);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const data = await post("/products", newProduct, {
        contentType: "application/json",
      });
      setNewProduct({ name: "", description: "", allergenInfo: "" });
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  if (error) return "Something went wrong!";

  return (
    <div className="container">
      <h1 className="text-center p-2">Products</h1>
      <div className="d-flex justify-content-end mt-2 mb-2">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Product
        </button>
      </div>
      <div className="row gx-4 gy-4">
        {loading
          ? Array(6)
              .fill()
              .map((_, index) => (
                <div key={index} className="col-12 col-xs-12 col-md-6 col-lg-4">
                  <Skeleton height={300} />
                </div>
              ))
          : products.map((product) => <ProductCard product={product} />)}
      </div>
      <AddProductModal
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        handleCreateProduct={handleCreateProduct}
        showConfirmation={showConfirmation}
      />
    </div>
  );
};

export default Products;
