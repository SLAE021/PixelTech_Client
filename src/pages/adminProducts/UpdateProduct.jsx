import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import service from "../../services/config";
import { useNavigate } from 'react-router-dom';


function UpdateProduct() {
  const navigate = useNavigate(); // Use the useNavigate hook
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Obtén el id del producto desde la URL
  const [productName, setProductName] = useState("");
  const [productDescription, setproductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productCategory, setProductCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
  const [isUploading, setIsUploading] = useState(false); // for a loading animation effect

  console.log("ProductDetail id:", id);
 
  // Carga de datos del producto desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await service.get(`/products/${id}`);
        setProduct(response.data);
        setProductName(response.data.name);
        setproductDescription(response.data.description);
        setProductPrice(response.data.price);
        setProductImage(response.data.image);
        setProductCategory(response.data.category);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [id]);


  if (!product) {
    return <div>Loading...</div>;
  }


    const handleImageChange = async (event) => {
      if (!event.target.files[0]) {
        return;
      }

      setIsUploading(true); // to start the loading animation

      const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
      uploadData.append("image", event.target.files[0]);

      try {
        const response = await service.post("/upload", uploadData)
        setProductImage(response.data.imageUrl);
        setIsUploading(false); // to stop the loading animation
      } catch (error) {
        navigate("/error");
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!productName)
      validationErrors.productName = "Nombre del producto no puede estar vacio";
    if (!productDescription)
      validationErrors.productDescription =
        "Descripcion del producto no puede estar vacio";
    if (!productPrice)
      validationErrors.productPrice = "Precio del producto no puede estar vacio";
    if (isNaN(productPrice))
      validationErrors.productPrice = "Precio del producto debe ser numerico";
    //if (!productImage) validationErrors.productImage = "Imagen del producto no puede estar vacio";
    if (!productCategory)
      validationErrors.productCategory = "Categoria del producto no puede estar vacio";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", productPrice);
    formData.append("image", productImage);
    formData.append("category", productCategory);

    try {
      const storedToken = localStorage.getItem("authToken");
      console.log(JSON.stringify(formData));
      const response = await service.patch(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${storedToken}`,
        },
      });

      console.log("Product updated:", response.data);

      setProductName("");
      setproductDescription("");
      setProductPrice("");
      setProductImage(null);
      setProductCategory("");

      // Show success alert
      setShowAlert(true);

      // Navigate to another page after a delay
      setTimeout(() => {
        navigate('/admin/products');
      }, 5000); // Adjust the delay as needed
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <section>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-8 ml-auto">
            <div className="row pt-md-5 mt-md-5 mb-5">
              <div className="col-12 ">
                {showAlert && (
                  <div className="alert alert-success" role="alert">
                    Producto agregado con exito!
                  </div>
                )}
                <div className="card col-lg-8 col-md-6 ">
                  <div className="card-title mt-3">
                    <h3>Agregar producto</h3>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="productname">
                          Nombre del producto:
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.productName ? "is-invalid" : ""
                          }`}
                          id="productname"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          placeholder="Nombre del producto"
                        />
                        {errors.productName && (
                          <div className="invalid-feedback">
                            {errors.productName}
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="productDescription">Descripción:</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.productDescription ? "is-invalid" : ""
                          }`}
                          id="productDescription"
                          value={productDescription}
                          onChange={(e) =>
                            setproductDescription(e.target.value)
                          }
                          placeholder="Descripcion del producto"
                        />
                        {errors.productDescription && (
                          <div className="invalid-feedback">
                            {errors.productDescription}
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="productprice">
                          Precio del producto:
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.productPrice ? "is-invalid" : ""
                          }`}
                          id="productprice"
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                          placeholder="Introduce Precio"
                        />
                        {errors.productPrice && (
                          <div className="invalid-feedback">
                            {errors.productPrice}
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="productcategory">Categoria:</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.productCategory ? "is-invalid" : ""
                          }`}
                          id="productcategory"
                          value={productCategory}
                          onChange={(e) => setProductCategory(e.target.value)}
                          placeholder="Introduce Categoria"
                        />
                        {errors.productCategory && (
                          <div className="invalid-feedback">
                            {errors.productCategory}
                          </div>
                        )}
                      </div>

                      <p>Imagen del producto:</p>
                      <div className="custom-file">
                        <input
                          type="file"
                          className={`custom-file-input ${
                            errors.productImage ? "is-invalid" : ""
                          }`}
                          id="productimage"
                          onChange={handleImageChange}
                          required
                          disabled={isUploading}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="productimage"
                        >
                          {productImage
                            ? productImage.name
                            : "Selecione archivo.."}
                        </label>
                        {errors.productImage 
                         
                        //&&  (
                          // <div className="invalid-feedback">
                          //   {errors.productImage}
                          // </div>
                        //)
                        }
                        {/* to render a loading message or spinner while uploading the picture */}
                        {isUploading ? <h3>... subiendo imagen</h3> : null}

                        {/* below line will render a preview of the image from cloudinary */}
                        {productImage ? (<div><img src={productImage} alt="img" width={200} /></div>) : null}
                      </div>

                      <button
                        className="btn btn-dark mt-5 mx-auto d-block"
                        type="submit"
                      >
                        Actualizar Producto
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpdateProduct;
