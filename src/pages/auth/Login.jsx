//import service from "../../services/config.js";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.jsx"
import API_BASE_URL from "../../services/config.js";
import axios from "axios";


const Login = () => {

  const navigate = useNavigate()
  const { authenticateUser } = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

      const userCredentials = {
        email,
        password
      }

      try {
        //const response = await service.post("/auth/login", userCredentials);
        const response = axios.post("https://pixeltech.netlify.app/api/auth/login", userCredentials);
        localStorage.setItem("authToken", response.data.authToken);
        await authenticateUser();
        //al autenticar al usuario, redirigimos a la landing page
        navigate("/");
      } catch (error) {
        if (error.response.status === 400) {
          setErrorMessage(error.response.data.message)
        } else {
          //! aqui deberia haber redirección a /error
        }
      }
  };

  return (
    <div className="container-sm" style={{ marginTop: "56px", padding: "100px, 0px" }}>
      <div className="row justify-content-center">
          <div className="card" style={{ width: "22rem" }}>
            <article className="card-body">
            <form onSubmit={handleLogin}>
                <h4 className="card-title mb-4 mt-1">Ingresar</h4>
                <div className="mb-3">
                  <label className="form-label">Correo Electronico:</label>
                  <input type="email" className="form-control" placeholder="Email" name="email" value={email} onChange={handleEmailChange}/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña:</label>
                    <input type="password" className="form-control" placeholder="******" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block"> Acceder  </button>
                </div>
                <div className="form-group">
                  {errorMessage && <p>{errorMessage}</p>}
                </div>
              </form>
            </article>
          </div>
      </div>
    </div>
  );
}

export default Login;