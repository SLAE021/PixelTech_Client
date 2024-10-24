import Banner from "./Banner";
import FeatureProduct from "./FeatureProduct";
import { useState, useEffect } from "react";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import service from "../../services/config";

function Landing() {
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
    <>
      <ScrollToTopOnMount />
      <Banner />
      <div className="d-flex flex-column bg-white py-4">
        <p className="text-center px-5">
          Bienvenidos a PixelTech su pagina de tecnologia.
        </p>
        <div className="d-flex justify-content-center">
          <Link to="/products" className="btn btn-primary" replace>
            Explorar Productos
          </Link>
        </div>
      </div>
      <h2 className="text-muted text-center mt-4 mb-3">Nuevos Productos</h2>
      <div className="container pb-5 px-lg-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
          {products.map((product) => (
            <div key={product.id} className="col">
              <div className="card shadow-sm">
                <img
                  className="card-img-top bg-dark cover"
                  height="240"
                  alt=""
                  src={product.Image}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">{product.name}</h5>
                  <p className="card-text text-center text-muted">
                    {product.price} €
                  </p>
                  <div className="d-grid gap-2">
                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-outline-dark"
                      replace
                    >
                      Ver más
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex flex-column bg-white py-4">
        <h5 className="text-center mb-3">Siguenos en</h5>
        <div className="d-flex justify-content-center">
          <a href="!#" className="me-3">
            <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
          </a>
          <a href="!#">
            <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
          </a>
          <a href="!#" className="ms-3">
            <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Landing;
