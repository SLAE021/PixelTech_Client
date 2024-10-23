import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import service from "../../services/config";

function ProductAdmin() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await service.get("/products");
        setProducts(response.data);
        console.log("Products fetched:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <nav className="navbar navbar-light bg-custom-light rounded">
        <div className="container-fluid">
          <a className="navbar-brand">Todos los Productos</a>
          <form className="d-flex">
            <Link to="/admin/add-product" className="btn btn-dark">
              <FontAwesomeIcon icon={["fas", "plus"]} />
              <span className="ms-2">Agregar Productos</span>
            </Link>
          </form>
        </div>
      </nav>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}€</td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-dark me-3 d-none d-lg-inline"
                >
                  <FontAwesomeIcon icon={["fas", "edit"]} />
                </button>
                <button
                  type="button"
                  className="btn btn-outline-dark me-3 d-none d-lg-inline"
                >
                  <FontAwesomeIcon icon={["fas", "trash"]} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductAdmin;
