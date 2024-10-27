import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import service from "../../services/config";

function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const navigate = useNavigate(); // Use the useNavigate hook
 

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

  const handleDeleteClick = (productId) => {
    setProductIdToDelete(productId);
    setShowModal(true);
  };

  const deleteProduct = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');
      await service.delete(`/products/${productIdToDelete}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      // Remove the deleted product from the state
      setProducts(products.filter(product => product._id !== productIdToDelete));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // create a method to update product information
  const updateProduct = async (productId) => {
    // navigate to the update product page
    navigate(`/admin/update-product/${productId}`);
  }

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
      <div className="d-flex justify-content-center my-4">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}€</td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-dark me-3 d-none d-lg-inline"
                  onClick={() => updateProduct(product._id)}
                >
                  <FontAwesomeIcon icon={["fas", "edit"]} />
                </button>
                <button
                  type="button"
                  id="deleteProduct"
                  className="btn btn-outline-dark me-3 d-none d-lg-inline"
                  onClick={() => handleDeleteClick(product._id)}
                >
                  <FontAwesomeIcon icon={["fas", "trash"]} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* Bootstrap Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar Borrado</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Estas seguro que quieres borrar este producto?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={deleteProduct}>Borrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAdmin;
