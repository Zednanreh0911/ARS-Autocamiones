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

      // Transformar los datos para que coincidan con los elementos esperados por Pdf
      const vehiculosTransformados = data.map((vehiculo) => ({
        marca: vehiculo.marca || "N/A",
        modelo: vehiculo.model || "N/A",
        combustible: vehiculo.combus || "N/A",
        año: vehiculo.year || "N/A",
        transmision: vehiculo.trans || "N/A",
      }));

      setVehiculos(vehiculosTransformados);
    };

    const fetchRepuestos = async () => {
      const data = await obtenerRepuestos();

      // Transformar los datos para que coincidan con los elementos esperados por Pdf
      const repuestosTransformados = data.map((repuesto) => ({
        modelo: repuesto.name || "N/A",
        marca: repuesto.marca || "N/A",
        cantidad: repuesto.cantidad || "N/A",
        categoria: repuesto.cat || "N/A",
        precio: repuesto.precio || "N/A",
      }));

      setRepuestos(repuestosTransformados);
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
        <Route path="/admin" element={<Admin />} />
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
