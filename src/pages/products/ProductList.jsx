import { Link } from "react-router-dom";
import Product from "./Product";
import ProductH from "./ProductH";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";

// Constantes
const categories = [
  "All Products",
  "Phones & Tablets",
  "Cases & Covers",
  "Screen Guards",
  "Cables & Chargers",
  "Power Banks",
];

// Componente de Filtro Lateral
function FilterMenuLeft({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState({ min: 100000, max: 500000 });

  // Maneja el cambio de rango de precios
  const handlePriceChange = (field, value) => {
    setPriceRange({ ...priceRange, [field]: Number(value) });
  };

  const applyFilters = () => {
    onFilterChange({ priceRange });
  };

  return (
    <ul className="list-group list-group-flush rounded">
      <li className="list-group-item d-none d-lg-block">
        <h5 className="mt-1 mb-2">Categorias</h5>
        <div className="d-flex flex-wrap my-2">
          {categories.map((category, i) => (
            <Link
              key={i}
              to="#"
              onClick={() => onFilterChange({ category })}
              className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
            >
              {category}
            </Link>
          ))}
        </div>
      </li>

      <li className="list-group-item">
        <h5 className="mt-1 mb-2">Rango de Precio</h5>
        <div className="d-grid d-block mb-3">
          <div className="form-floating mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => handlePriceChange("min", e.target.value)}
            />
            <label>Menor Precio</label>
          </div>
          <div className="form-floating mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => handlePriceChange("max", e.target.value)}
            />
            <label>Maximo Precio</label>
          </div>
          <button className="btn btn-dark" onClick={applyFilters}>
            Aplicar
          </button>
        </div>
      </li>
    </ul>
  );
}

// Componente Principal de Lista de Productos
function ProductList() {
  const [viewType, setViewType] = useState({ grid: true });
  const [filters, setFilters] = useState({
    category: "All Products",
    priceRange: { min: 100000, max: 500000 },
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts(filters).then((data) => setProducts(data));
  }, [filters]);

  const changeViewType = () => {
    setViewType({ grid: !viewType.grid });
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />

      {/* Categorías - Breadcrumb */}
      <nav aria-label="breadcrumb" className="bg-custom-light rounded">
        <ol className="breadcrumb p-3 mb-0">
          <li className="breadcrumb-item">
            <Link
              className="text-decoration-none link-secondary"
              to="/products"
            >
              Todos los Productos
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {filters.category}
          </li>
        </ol>
      </nav>

      {/* Filtros para Móviles */}
      <div className="h-scroller d-block d-lg-none">
        <nav className="nav h-underline">
          {categories.map((category, i) => (
            <div key={i} className="h-link me-2">
              <Link
                to="#"
                onClick={() => handleFilterChange({ category })}
                className="btn btn-sm btn-outline-dark rounded-pill"
              >
                {category}
              </Link>
            </div>
          ))}
        </nav>
      </div>

      {/* Vista de Productos */}
      <div className="row mb-4 mt-lg-3">
        <div className="d-none d-lg-block col-lg-3">
          <div className="border rounded shadow-sm">
            <FilterMenuLeft onFilterChange={handleFilterChange} />
          </div>
        </div>
        <div className="col-lg-9">
          <div className="d-flex flex-column h-100">
            {/* Opciones de Visualización y Búsqueda */}
            <div className="row mb-3">
              <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Buscar productos..."
                    aria-label="search input"
                  />
                  <button className="btn btn-outline-dark">
                    <FontAwesomeIcon icon={["fas", "search"]} />
                  </button>
                </div>
                <button
                  className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                  onClick={changeViewType}
                >
                  <FontAwesomeIcon
                    icon={["fas", viewType.grid ? "th-list" : "th-large"]}
                  />
                </button>
              </div>
            </div>

            {/* Productos Filtrados */}
            <div
              className={`row g-3 mb-4 flex-shrink-0 ${
                viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2"
              }`}
            >
              {products.map((product, i) =>
                viewType.grid ? (
                  <Product
                    key={i}
                    product={product}
                    percentOff={i % 2 === 0 ? 15 : null}
                  />
                ) : (
                  <ProductH
                    key={i}
                    product={product}
                    percentOff={i % 4 === 0 ? 15 : null}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function fetchProducts(filters) {
  try {
    const url = `https://pixeltech-server.onrender.com/api/products?category=${encodeURIComponent(
      filters.category
    )}&minPrice=${filters.priceRange.min}&maxPrice=${filters.priceRange.max}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return [];
  }
}

export default ProductList;
