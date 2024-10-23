import "./App.css";
import { Route, Routes } from "react-router-dom";

// pages
import Template from "./pages/template/Template";
import ProductDetail from "./pages/products/detail/ProductDetail";
import Landing from "./pages/landing/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProductList from "./pages/products/ProductList";

import ProductAdmin from "./pages/adminProducts/ProductAdmin";

function App() {
  return (
    <Template>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Signup />} />
        <Route path="/" element={<Landing />} />
        <Route path="/admin/products" element={<ProductAdmin />} />
      </Routes>
    </Template>
  );
}

export default App;
