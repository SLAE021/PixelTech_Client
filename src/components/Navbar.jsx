import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { spread } from "axios";

function Navbar() {

  const navigate = useNavigate()
  const { isLoggedIn, authenticateUser, isAdmin } = useContext(AuthContext)

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
    <nav>
      <Link to="/">Home</Link>
      { !isLoggedIn && <Link to="/signup">Registro</Link> }
      { !isLoggedIn && <Link to="/login">Acceso</Link> }
      { isLoggedIn &&<Link to="/private-page-example">Ejemplo Privado</Link> }
      { isLoggedIn &&<Link onClick={handleLogout}>Cerrar sesión</Link> }
      {isLoggedIn && isAdmin && <span>usuario admin</span> }
      {isLoggedIn && !isAdmin && <span>usuario normal</span> }
    </nav>
  );
}

export default Navbar;
