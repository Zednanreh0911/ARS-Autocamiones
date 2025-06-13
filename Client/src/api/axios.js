import axios from "axios";

//devuelve la url de la api
const API_URL = `http://${window.location.hostname}:3000`;

export const obtenerRepuestos = async () => {
  try {
    const response = await axios.get(`${API_URL}/repuestos`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const obtenerVehiculos = async () => {
  try {
    const response = await axios.get(`${API_URL}/vehiculos`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const obtenerUsuarios = async () => {
  try {
    const response = await axios.get(`${API_URL}/usuarios`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const loginUsuario = async (datos) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios/login`, datos);
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
        "Ocurrió un error inesperado. Intenta de nuevo."
    );
  }
};

export const crearVehiculo = async (datos) => {
  try {
    const response = await axios.post(`${API_URL}/vehiculos`, datos);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const crearRepuesto = async (datos) => {
  try {
    const response = await axios.post(`${API_URL}/repuestos`, datos);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const crearUsuario = async (datos) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios`, datos);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const eliminarUsuario = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const eliminarVehiculo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/vehiculos/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const eliminarRepuesto = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/repuestos/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editarVehiculo = async (id, datos) => {
  try {
    const response = await axios.put(`${API_URL}/vehiculos/${id}`, datos);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editarVehiculoNewImg = async (id, datos) => {
  try {
    const response = await axios.put(`${API_URL}/vehiculos/${id}/new`, datos);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const editarRepuesto = async (id, datos) => {
  try {
    console.log("datos", datos);
    const response = await axios.put(`${API_URL}/repuestos/${id}`, datos);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editarRepuestoNewImg = async (id, datos) => {
  try {
    const response = await axios.put(`${API_URL}/repuestos/${id}/new`, datos);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
