import service from "../../services/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    // ... contactar al backend para registrar al usuario aqui
    const newUser = {
      email,
      username,
      password
    }
    try {
      const response = await service.post("/auth/Signup", newUser)
      localStorage.setItem("authToken", response.data.authToken)
      //mostrar mensaje de exito y redireccionar a la landing page
      navigate("/")

    } catch (error) {
      console.log(error)
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
            <form onSubmit={handleSignup}>
                <h4 className="card-title mb-4 mt-1">Formulario de Registro</h4>
                <div className="mb-3">
                  <label className="form-label">Correo Electronico:</label>
                  <input type="email" className="form-control" placeholder="Email" name="email" value={email} onChange={handleEmailChange}/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Usuario:</label>
                  <input type="text" className="form-control" placeholder="usuario" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña:</label>
                    <input type="password" className="form-control" placeholder="******" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block"> Registrar  </button>
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

export default Signup;



// <div>

// <h1>Formulario de Registro</h1>

// <form onSubmit={handleSignup}>

//   <label>Correo Electronico:</label>
//   <input
 
//     type="email"
//     name="email"
//     value={email}
//     onChange={handleEmailChange}
//   />

//   <br />

//   <label>Username:</label>
//   <input
  
//     type="text"
//     name="username"
//     value={username}
//     onChange={handleUsernameChange}
//   />

//   <br />

//   <label>Contraseña:</label>
//   <input
 
//     type="password"
//     name="password"
//     value={password}
//     onChange={handlePasswordChange}
//   />

//   <br />

//   <button type="submit">Registrar</button>

//   {errorMessage && <p>{errorMessage}</p>}

// </form>

// </div>