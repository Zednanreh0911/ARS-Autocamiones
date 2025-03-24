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
