// Decodificar JWT (solo para obtener datos, no valida firma)
export function decodificarJWT(token) {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );
    return decoded;
  } catch {
    return null;
  }
}

export function obtenerCookie(nombre) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [key, ...val] = cookie.trim().split("=");
    if (key === nombre) {
      return val.join("=");
    }
  }
  return null;
}
import axios from "axios";

const API_URL = `http://${window.location.hostname}:3000`;

// Instancia de axios con credenciales para cookies
const axiosConCredenciales = axios.create({
  withCredentials: true,
});

export const obtenerRepuestos = async () => {
  const response = await axios.get(`${API_URL}/repuestos`);
  return response.data;
};

export const obtenerVehiculos = async () => {
  const response = await axios.get(`${API_URL}/vehiculos`);
  return response.data;
};

export const obtenerUsuarios = async () => {
  const response = await axios.get(`${API_URL}/usuarios`);
  return response.data;
};

export const loginUsuario = async (datos) => {
  const response = await axiosConCredenciales.post(
    `${API_URL}/usuarios/login`,
    datos
  );
  return response.data;
};

export const logoutUsuario = async () => {
  const response = await axiosConCredenciales.post(
    `${API_URL}/usuarios/logout`,
    {}
  );
  return response.data;
};

export const crearVehiculo = async (datos) => {
  const response = await axios.post(`${API_URL}/vehiculos`, datos);
  return response.data;
};

export const crearRepuesto = async (datos) => {
  const response = await axios.post(`${API_URL}/repuestos`, datos);
  return response.data;
};

export const crearUsuario = async (datos) => {
  const response = await axios.post(`${API_URL}/usuarios`, datos);
  return response.data;
};

export const eliminarUsuario = async (id) => {
  const response = await axios.delete(`${API_URL}/usuarios/${id}`);
  return response.data;
};

export const eliminarVehiculo = async (id) => {
  const response = await axios.delete(`${API_URL}/vehiculos/${id}`);
  return response.data;
};

export const eliminarRepuesto = async (id) => {
  const response = await axios.delete(`${API_URL}/repuestos/${id}`);
  return response.data;
};

export const editarVehiculo = async (id, datos) => {
  const response = await axios.put(`${API_URL}/vehiculos/${id}`, datos);
  return response.data;
};

export const editarVehiculoNewImg = async (id, datos) => {
  const response = await axios.put(`${API_URL}/vehiculos/${id}/new`, datos);
  return response.data;
};
export const editarRepuesto = async (id, datos) => {
  const response = await axios.put(`${API_URL}/repuestos/${id}`, datos);
  return response.data;
};

export const editarRepuestoNewImg = async (id, datos) => {
  const response = await axios.put(`${API_URL}/repuestos/${id}/new`, datos);
  return response.data;
};
