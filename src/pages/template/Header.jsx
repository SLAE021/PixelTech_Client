import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Header() {
  const navigate = useNavigate()
  const [openedDrawer, setOpenedDrawer] = useState(false)
  const { isLoggedIn, isAdmin, authenticateUser } = useContext(AuthContext);

  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer);
  }

  function changeNav() {
    if (openedDrawer) {
      setOpenedDrawer(false)
    }
  }

  const handleLogout = async () => {

    try {
      localStorage.removeItem("authToken") // removemos el token

      await authenticateUser() // validat el token, la funcion cambia los estados

      navigate("/") // navegamos a cualquier página pública

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={changeNav}>
             <FontAwesomeIcon icon={["fas", "cash-register"]} />
            <span className="ms-2 h5">PixelTech</span>
          </Link>

          <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? 'open' : '')}>
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link to="/products" className="nav-link" replace onClick={changeNav}>
                  ver productos
                </Link>
              </li>
            </ul>
            <button type="button" className="btn btn-outline-dark me-3 d-none d-lg-inline">
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">0</span>
            </button>
            <ul className="navbar-nav mb-4 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  href="!#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={["fas", "user-alt"]} />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  {isLoggedIn && isAdmin && (
                  <li>
                    <Link to="/admin/products" className="dropdown-item" onClick={changeNav}>
                      Admin
                    </Link>
                  </li>
                  )}
                  {!isLoggedIn && (
                  <li>
                    <Link to="/login" className="dropdown-item" onClick={changeNav}>
                      Login
                    </Link>
                  </li>
                  )}
                  {!isLoggedIn && (
                  <li>
                    <Link to="/registro" className="dropdown-item" onClick={changeNav}>
                      Registro
                    </Link>
                  </li>
                  )}
                  {isAdmin && (
                  <li>
                    <Link className="dropdown-item" onClick={handleLogout}>
                     Cerrar sesión
                    </Link>
                  </li>
                  )}
                </ul>
              </li>
            </ul>
          </div>

          <div className="d-inline-block d-lg-none">
            <button type="button" className="btn btn-outline-dark">
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">0</span>
            </button>
            <button className="navbar-toggler p-0 border-0 ms-3" type="button" onClick={toggleDrawer}>
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;