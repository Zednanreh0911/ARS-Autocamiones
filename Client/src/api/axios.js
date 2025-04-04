import axios from "axios";

const API_URL = "http://localhost:3000";

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
