import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import PropTypes from "prop-types";
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  rolesPermitidos: PropTypes.arrayOf(PropTypes.string),
};

export default function ProtectedRoute({ children, rolesPermitidos = [] }) {
  const { isAuthenticated, userRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "40vh",
        }}
      >
        <div style={{ fontSize: 24, fontWeight: "bold" }}>Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated && rolesPermitidos.length > 0) {
    return <Navigate to="/login" replace />;
  }

  if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(userRole)) {
    console.log("Ruta protegida, pero usuario sin permisos");
    return <Navigate to="/" replace />;
  }

  return children;
}
