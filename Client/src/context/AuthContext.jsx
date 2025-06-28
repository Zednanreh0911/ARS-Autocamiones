import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContextInstance";
import { obtenerCookie, decodificarJWT } from "../api/axios";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("consulta");
  const [userName, setUserName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = obtenerCookie("auth");
    console.log("Token obtenido:", token);
    const datos = decodificarJWT(token);
    if (datos && datos.user && datos.rol) {
      console.log("Datos decodificados:", datos);
      setIsAuthenticated(true);
      setUserRole(datos.rol);
      setUserName(datos.user);
    } else {
      setIsAuthenticated(false);
      setUserRole("consulta");
      setUserName(null);
    }
    setIsLoading(false);
  }, []);
  console.log("Usuario autenticado:", isAuthenticated, "Cargando:", isLoading);

  const login = (role = "admin", user = null) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserName(user);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole("consulta");
    setUserName(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userRole, userName, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
