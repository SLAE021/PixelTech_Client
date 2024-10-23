import { useState } from "react";
import axios from "axios";


const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [productId, setProductId] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [productCategory, setProductCategory] = useState(""); 
    const [errors, setErrors] = useState({});

    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProductImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        let validationErrors = {};
        if (!productName) validationErrors.productName = "Product Name Can't Be Empty";
        if (!productId) validationErrors.productId = "Product ID Can't Be Empty";
        if (!productPrice) validationErrors.productPrice = "Product Price Can't Be Empty";
        if (!productImage) validationErrors.productImage = "Product Image Can't Be Empty";
        if (!productCategory) validationErrors.productCategory = "Product Category Can't Be Empty";

        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

       
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("productId", productId);
        formData.append("productPrice", productPrice);
        formData.append("productImage", productImage);
        formData.append("productCategory", productCategory);

        try {
            const response = await axios.post("/api/products/new", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Product added:", response.data);
            
            setProductName("");
            setProductId("");
            setProductPrice("");
            setProductImage(null);
            setProductCategory(""); 
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <section>
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-lg-10 col-md-8 ml-auto">
                        <div className="row align-items-center pt-md-5 mt-md-5 mb-5">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-title text-center mt-3">
                                        <h3>Add Product</h3>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="productname">Product Name:</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.productName ? 'is-invalid' : ''}`}
                                                    id="productname"
                                                    value={productName}
                                                    onChange={(e) => setProductName(e.target.value)}
                                                    placeholder="Enter Product Name"
                                                />
                                                {errors.productName && <div className="invalid-feedback">{errors.productName}</div>}
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="productid">Product Id:</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.productId ? 'is-invalid' : ''}`}
                                                    id="productid"
                                                    value={productId}
                                                    onChange={(e) => setProductId(e.target.value)}
                                                    placeholder="Enter Product Id"
                                                />
                                                {errors.productId && <div className="invalid-feedback">{errors.productId}</div>}
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="productprice">Product Price:</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.productPrice ? 'is-invalid' : ''}`}
                                                    id="productprice"
                                                    value={productPrice}
                                                    onChange={(e) => setProductPrice(e.target.value)}
                                                    placeholder="Enter Product Price"
                                                />
                                                {errors.productPrice && <div className="invalid-feedback">{errors.productPrice}</div>}
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="productcategory">Product Category:</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.productCategory ? 'is-invalid' : ''}`}
                                                    id="productcategory"
                                                    value={productCategory}
                                                    onChange={(e) => setProductCategory(e.target.value)}
                                                    placeholder="Enter Product Category"
                                                />
                                                {errors.productCategory && <div className="invalid-feedback">{errors.productCategory}</div>}
                                            </div>

                                            <p>Product Image:</p>
                                            <div className="custom-file">
                                                <input
                                                    type="file"
                                                    className={`custom-file-input ${errors.productImage ? 'is-invalid' : ''}`}
                                                    id="productimage"
                                                    onChange={handleImageChange}
                                                    required
                                                />
                                                <label className="custom-file-label" htmlFor="productimage">
                                                    {productImage ? productImage.name : "Choose file..."}
                                                </label>
                                                {errors.productImage && <div className="invalid-feedback">{errors.productImage}</div>}
                                            </div>

                                            <button className="btn btn-dark mt-5 mx-auto d-block" type="submit">
                                                Add Product
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
};

export default AddProduct;
