import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

function Product() {
  const [products, setProducts] = useState([]);

  // Llamar a la API para obtener productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://pixeltech-server.onrender.com/api/products');
        
        // Filtrar productos duplicados usando un Set basado en `product._id`
        const uniqueProducts = response.data.filter((product, index, self) =>
          index === self.findIndex((p) => p._id === product._id)
        );

        setProducts(uniqueProducts);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="row">
      {products.map((product) => {
        let offPrice = `${product.price}€`;
        let percentOff;

        if (product.percentOff && product.percentOff > 0) {
          percentOff = (
            <div
              className="badge bg-dim py-2 text-white position-absolute"
              style={{ top: '0.5rem', right: '0.5rem' }}
            >
              {product.percentOff}% Descuento
            </div>
          );

          offPrice = (
            <>
              <del>{product.price}€</del> {product.price - (product.percentOff * product.price) / 100}€
            </>
          );
        }

        return (
          <div className="col" key={product._id}>
            <div className="card shadow-sm">
              <Link to={`/products/${product._id}`}>
                {percentOff}
                <img
                  className="card-img-top bg-dark cover"
                  height="200"
                  alt={product.name}
                  src={product.image}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title text-center text-dark text-truncate">
                  {product.name}
                </h5>
                <p className="card-text text-center text-muted mb-0">{offPrice}</p>
                <div className="d-grid d-block">
                  <button className="btn btn-outline-dark mt-3">
                    <FontAwesomeIcon icon={['fas', 'cart-plus']} /> Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Product;
