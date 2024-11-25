import { useEffect, useState } from "react";
import axios from "axios";
import VehiculosList from "../components/VehiculosList";

function HomePage() {
  const [Vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    async function fetchV() {
      const res = await axios.get("http://localhost:8000/Vehiculos");
      setVehiculos(res.data);
    }
    fetchV();
  }, []);

  return <VehiculosList Vehiculos={Vehiculos} />;
}

export default HomePage;
