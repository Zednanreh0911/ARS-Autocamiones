import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar.jsx";
import VehiculosPage from "./pages/VehiculosPage";
import RepuestosPage from "./pages/RepuestosPage";
import SobreNosotrosPage from "./pages/SobrePage";
import Login from "./pages/Login";
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vehiculos" element={<VehiculosPage />} />
        <Route path="/repuestos" element={<RepuestosPage />} />
        <Route path="/sobre_nosotros" element={<SobreNosotrosPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
