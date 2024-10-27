import "./App.css";
import { Route, Routes } from 'react-router-dom';

// pages
import Template from "./pages/template/Template";
import ProductDetail from "./pages/products/detail/ProductDetail";
import Landing from "./pages/landing/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProductList from "./pages/products/ProductList";
import AddProduct from "./pages/adminProducts/AddProduct";
import ProductAdmin from "./pages/adminProducts/ProductAdmin";
import NotFound from "./pages/NotFound,";
import error from "./pages/error";
import UpdateProduct from "./pages/adminProducts/UpdateProduct"; 


function App() {

  return (
      <Template>
        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Signup />} />
          <Route path="/" element={<Landing />} />
          <Route path="/admin/products" element={<ProductAdmin />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/update-product/:id" element={<UpdateProduct />} />
          <Route path={"/error"} element={<error/>}/>
          <Route path={"*"} element={<NotFound/>}/>
        </Routes>
      </Template>
  );
}

export default App
