import React, { useEffect, useState } from "react";
import useApi from "../customHooks/useApi";
import Loading from "../components/Loading";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { RiExpandUpDownLine } from "react-icons/ri";

const Dashboard = () => {
  const { get, loading, error } = useApi();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await get("/dashboard");
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [get]);

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
      setProducts([...products.reverse()]);
    } else {
      setSortBy(key);
      setSortDirection("asc");
      const sortedProducts = [...products].sort((a, b) => {
        if (key === "id") {
          return parseInt(a[key], 10) - parseInt(b[key], 10);
        } else {
          return a[key] < b[key] ? -1 : 1;
        }
      });
      setProducts(sortedProducts);
    }
  };

  const handleCheck = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (error) return "Something went wrong!";

  if (loading) return <Loading />;
  return (
    <div className="container mt-4">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by ID or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="table-responsive">
        {" "}
        {/* Making table responsive */}
        <table className="table table-bordered table-striped">
          {" "}
          {/* Adding bootstrap table classes */}
          <thead>
            <tr>
              <th style={{ width: "10%" }} onClick={() => handleSort("id")}>
                ID{" "}
                {sortBy === "id" ? (
                  sortDirection === "asc" ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )
                ) : (
                  <RiExpandUpDownLine /> // Double chevron icon when not sorted
                )}
              </th>
              <th
                style={{ width: "20%" }}
                onClick={() => handleSort("selling_price")}
              >
                Selling Price{" "}
                {sortBy === "selling_price" ? (
                  sortDirection === "asc" ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )
                ) : (
                  <RiExpandUpDownLine /> // Double chevron icon when not sorted
                )}
              </th>
              <th style={{ width: "50%" }} onClick={() => handleSort("name")}>
                Name{" "}
                {sortBy === "name" ? (
                  sortDirection === "asc" ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )
                ) : (
                  <RiExpandUpDownLine /> // Double chevron icon when not sorted
                )}
              </th>
              <th style={{ width: "20%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.selling_price}</td>
                <td>{product.name}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleCheck(product.id)}
                  >
                    Check
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
