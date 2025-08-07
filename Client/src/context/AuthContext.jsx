import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContextInstance";
import { obtenerCookie, decodificarJWT } from "../api/axios";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Roles posibles: "consulta", "admin", "gerente" (superuser)
  const [userRole, setUserRole] = useState("consulta");
  const [userName, setUserName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authToken = obtenerCookie("auth");
  useEffect(() => {
    console.log("Token obtenido:", authToken);
    const datos = decodificarJWT(authToken);
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
  }, [authToken]);
  console.log("Usuario autenticado:", isAuthenticated, "Cargando:", isLoading);

  const login = (role = "admin", user = null, token = null) => {
    setIsAuthenticated(true);
    setUserRole(role); // Puede ser "admin", "consulta" o "gerente"
    setUserName(user);
    if (token) {
      // Si usas cookies o localStorage para el token, guárdalo aquí
      document.cookie = `auth=${token}; path=/;`;
    }
  };

  const logout = () => {
    // Remove auth cookie (set expiration in the past)
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
