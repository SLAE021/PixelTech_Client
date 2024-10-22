import service from "../services/config";
import { useEffect, useState } from "react";

function PrivatePageExample() {
  const [dataOnlyForLoggedUsers, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      // call a private route here...
      // const authToken = localStorage.getItem("authToken")
      // const response = await axios.get("http://localhost:5005/api/auth/user/perfil", {
      //   headers: { authorization: `Bearer ${authToken}` }
      // })
      const response = await service.get("/auth/user/perfil");

      console.log(response);
      setData(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // loading handler here

  return (
    <div>
      <h3>Ejemplo de página privada</h3>
      <p>
        Solo usuarios que hayan validado credenciales deberian poder acceder y
        ver la siguiente información:
      </p>

      {dataOnlyForLoggedUsers}
    </div>
  );
}

export default PrivatePageExample;
