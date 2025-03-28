import axios from "axios";

const API_URL = "http://localhost:6969";

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

export const crearVehiculo = async (datos) => {
  try {
    const response = await axios.post(`${API_URL}/vehiculos`, datos);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const crearRepuesto = async () => {
  try {
    const response = await axios.post(`${API_URL}/repuestos`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const crearUsuario = async () => {
  try {
    const response = await axios.post(`${API_URL}/usuarios`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editarVehiculo = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/vehiculos/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editarRepuesto = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/repuestos/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editarUsuario = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/usuarios/${id}`);
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

export const eliminarUsuario = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};