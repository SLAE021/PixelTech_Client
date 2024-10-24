import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";
import service from "../../../services/config";


function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Obtén el id del producto desde la URL
 
  // Carga de datos del producto desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await service.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [id]);


  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount/>
      <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
        <ol className="breadcrumb p-3">
          <li className="breadcrumb-item">
            <Link className="text-decoration-none link-secondary" to="/products">
              All Products
            </Link>
          </li>
          <li className="breadcrumb-item">
            <a className="text-decoration-none link-secondary" href="!#">
              {product.category}
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>
      <div className="row mb-4">
        <div className="d-none d-lg-block col-lg-1">
          <div className="image-vertical-scroller">
            <div className="d-flex flex-column">
              {/* {product.images.map((image, i) => {
                let selected = i !== 1 ? "opacity-6" : "";
                return (
                  <a key={i} href="!#">
                    <img
                      className={"rounded mb-2 ratio " + selected}
                      alt=""
                      src={image.url}
                    />
                  </a>
                );
              })} */}
              <a key="1" href="!#">
                    <img
                      className={"rounded mb-2 ratio opacity-6"}
                      alt=""
                      src=""
                    />
                  </a>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-12 mb-4">
              <img
                className="border rounded ratio ratio-1x1"
                alt=""
                src={product.image}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="d-flex flex-column h-100">
            <h2 className="mb-1">{product.name}</h2>
            <h4 className="text-muted mb-4">{product.price} €</h4>

            <div className="row g-3 mb-4">
              <div className="col">
                <button className="btn btn-outline-dark py-2 w-100">
                  Add to cart
                </button>
              </div>
              <div className="col">
                <button className="btn btn-dark py-2 w-100">Buy now</button>
              </div>
            </div>

            <h4 className="mb-0">Details</h4>
            <hr />
            <dl className="row">

              <dt className="col-sm-4">Category</dt>
              <dd className="col-sm-8 mb-3">{product.category}</dd>

            </dl>

            <h4 className="mb-0">Description</h4>
            <hr />
            <p className="lead flex-shrink-0">
              <small>{product.description}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
