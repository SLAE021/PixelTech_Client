import "./App.css";
import { Route, Routes } from 'react-router-dom';

// pages
import Template from "./pages/template/Template";
import ProductDetail from "./pages/products/detail/ProductDetail";
import Landing from "./pages/landing/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProductList from "./pages/products/ProductList";

// pages old
// import HomePage from "./pages/HomePage"
// import Login from "./pages/auth/Login"
// import Signup from "./pages/auth/Signup"
// import PrivatePageExample from "./pages/PrivatePage";

// components
// import Navbar from "./components/Navbar"
// import Private from "./components/auth/Private";

function App() {

  return (
      <Template>
        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Signup />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </Template>
  );


  // return (
  //   <div>
  //     <Navbar />

  //     <br />
  //     <hr />

  //     <Routes>
  //       <Route path="/" element={<HomePage />} />
  //       <Route path="/signup" element={<Signup />} />
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/private-page-example" element={ <Private> <PrivatePageExample /> </Private> } />

  //       {/* error FE routes here... */}

  //     </Routes>
  //   </div>
  // )
}

export default App
