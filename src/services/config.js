import axios from "axios";
export const API_BASE_URL = import.meta.env.VITE_PIXELTECH_SERVER;



const service = axios.create({
  baseURL: API_BASE_URL+'/api/',
});

// añade el token a todas las llamadas que se hagan con este servicio de axios
service.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem("authToken");

  if (storedToken) {
    config.headers.authorization = `Bearer ${storedToken}`;
  }

  return config;
});

export default service;
