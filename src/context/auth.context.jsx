import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import service from "../services/config";
import { RiseLoader } from "react-spinners";

// Componente de contexto
const AuthContext = createContext();

// Componente envoltorio
function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [isValidatingToken, setIsValidatingToken] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // esto para verificar si el usuario está logeado o no cuando visita la página (cuando en toda la pagina ocurre el componenteDidMount)
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    //esta es una funcion que llamará a la ruta /verify y nos actualiza los estados y se llamará luego de hacer login/logout o volver a la app.
    try {
      const response = await service.get("/auth/verify");

      console.log(response);
      // el token es valido
      setIsLoggedIn(true);
      setLoggedUserId(response.data._id);
      setIsValidatingToken(false);

      if (response.data.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      //el token no es valido no existe
      console.log(error);
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setIsValidatingToken(false);

      setIsAdmin(false);
    }
  };

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticateUser,
    isAdmin,
  };

  if (isValidatingToken) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <RiseLoader color="#462ff7" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

// Define prop types
AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthWrapper };
