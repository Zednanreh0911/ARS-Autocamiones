import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import VehiculosPage from "./pages/VehiculosPage";
import RepuestosPage from "./pages/RepuestosPage";
import SobreNosotrosPage from "./pages/SobrePage";
import Login from "./pages/Login";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Footerbar from "./components/Footerbar.jsx";
import Admin from "./pages/Admin.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import Error404 from "./pages/Error404.jsx";
import PdfVehiculos from "./components/PdfVehiculos.jsx";
import PdfRepuestos from "./components/PdfRepuestos.jsx";
import { obtenerRepuestos, obtenerVehiculos } from "./api/axios.js";
import { useEffect, useState } from "react";

function AppRoutes() {
  const location = useLocation();
  const validPaths = [
    "/",
    "/vehiculos",
    "/repuestos",
    "/sobre_nosotros",
    "/login",
    "/admin",
  ];
  const hideFooter =
    location.pathname === "/login" ||
    !validPaths.includes(location.pathname) ||
    location.pathname === "/admin";

  const hideNavbar =
    !validPaths.includes(location.pathname) || location.pathname === "/login";
  const [vehiculos, setVehiculos] = useState([]);
  const [repuestos, setRepuestos] = useState([]);
  useEffect(() => {
    const fetchVehiculos = async () => {
      const data = await obtenerVehiculos();

      setVehiculos(data);
    };

    const fetchRepuestos = async () => {
      const data = await obtenerRepuestos();

      setRepuestos(data);
    };

    fetchVehiculos();
    fetchRepuestos();
  }, []);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vehiculos" element={<VehiculosPage />} />
        <Route path="/repuestos" element={<RepuestosPage />} />
        <Route path="/sobre_nosotros" element={<SobreNosotrosPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute rolesPermitidos={["admin", "gerente", "auditor"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Error404 />} />
        <Route
          path="/pdf_vehiculos"
          element={<PdfVehiculos title={"Vehiculos"} elementos={vehiculos} />}
        />
        <Route
          path="/pdf_repuestos"
          element={<PdfRepuestos title={"Repuestos"} elementos={repuestos} />}
        />
      </Routes>
      {!hideFooter && <Footerbar />}
    </>
  );
}

export default AppRoutes;
