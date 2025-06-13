import AutoCard from "../components/AutoCard";
import carro1 from "../assets/auto3.jpg";
import carro2 from "../assets/auto2.jpg";
import { obtenerVehiculos } from "../api/axios";
import { useState, useRef, useEffect } from "react";

function VehiclePage() {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    obtenerVehiculos().then((vehiculos) => setVehiculos(vehiculos));
  }, []);
  const [selectedVehicle, setSelectedVehicle] = useState("camionetas");
  const vehiculosRef = useRef(null);

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    if (vehicle === "camionetas" || vehicle === "autobuses") {
      vehiculosRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleActualizarVehiculo = (id, datosActualizados) => {
    setVehiculos((prevVehiculos) =>
      prevVehiculos.map((vehiculo) =>
        vehiculo.id_vehiculo === id
          ? { ...vehiculo, ...datosActualizados }
          : vehiculo
      )
    );
  };

  const handleEliminarVehiculo = (id) => {
    setVehiculos((prevVehiculos) =>
      prevVehiculos.filter((vehiculo) => vehiculo.id_vehiculo !== id)
    );
  };

  return (
    <main className="mt-40">
      <section
        ref={vehiculosRef}
        className="w-full flex flex-wrap justify-evenly gap-8"
      >
        <button
          onClick={() => handleSelectVehicle("camionetas")}
          className="relative overflow-hidden rounded-lg max-[470px]:mx-4 group"
        >
          <img
            className="transition-transform duration-300 ease-in-out transform hover:scale-110 w-[450px] min-[1350px]:w-full"
            src={carro1}
            alt="camionetas img"
          />
          <span className="pointer-events-none bg-black bg-opacity-25 p-2 rounded-md text-white absolute bottom-2 right-4 font-bold text-xl transition-all duration-300 ease-in-out group-hover:bottom-1/2 group-hover:right-1/2 group-hover:translate-x-1/2 group-hover:translate-y-1/2 group-hover:text-4xl">
            Camionetas
          </span>
        </button>
        <button
          className="relative overflow-hidden rounded-lg max-[470px]:mx-4 group"
          onClick={() => handleSelectVehicle("autobuses")}
        >
          <img
            className="transition-transform duration-300 ease-in-out transform hover:scale-110 w-[450px] min-[1350px]:w-full"
            src={carro2}
            alt="autobus img"
          />
          <span className="pointer-events-none bg-black bg-opacity-25 p-2 rounded-md text-white absolute bottom-2 right-4 font-bold text-xl transition-all duration-300 ease-in-out group-hover:bottom-1/2 group-hover:right-1/2 group-hover:translate-x-1/2 group-hover:translate-y-1/2 group-hover:text-4xl">
            Autobuses
          </span>
        </button>
      </section>
      <section
        className={`w-full pt-16 ${
          selectedVehicle === "camionetas" ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-wrap gap-8 items-end justify-center">
          <div>
            <h3 className="font-bold text-4xl">Camionetas</h3>
            {vehiculos &&
              vehiculos
                .filter((vehiculo) => vehiculo.tipo_vehiculo === "Camioneta")
                .slice(0, 1)
                .map((vehiculo, index) => (
                  <AutoCard
                    key={index}
                    image={vehiculo.imagen_url}
                    marca={vehiculo.marca}
                    anno={Number(vehiculo.año)}
                    modelo={vehiculo.modelo}
                    tipo_combustible={vehiculo.tipo_combustible}
                    tipo_transmision={vehiculo.tipo_transmision}
                    id={vehiculo.id_vehiculo}
                    onEliminar={handleEliminarVehiculo}
                    onActualizar={handleActualizarVehiculo}
                    tipo_vehiculo={vehiculo.tipo_vehiculo}
                    cantidad={Number(vehiculo.cantidad)}
                  />
                ))}
          </div>

          {vehiculos &&
            vehiculos
              .filter((vehiculo) => vehiculo.tipo_vehiculo === "Camioneta")
              .slice(1)
              .map((vehiculo, index) => (
                <AutoCard
                  key={index}
                  image={vehiculo.imagen_url}
                  marca={vehiculo.marca}
                  anno={Number(vehiculo.año)}
                  modelo={vehiculo.modelo}
                  tipo_combustible={vehiculo.tipo_combustible}
                  tipo_transmision={vehiculo.tipo_transmision}
                  id={vehiculo.id_vehiculo}
                  onEliminar={handleEliminarVehiculo}
                  onActualizar={handleActualizarVehiculo}
                  tipo_vehiculo={vehiculo.tipo_vehiculo}
                  cantidad={Number(vehiculo.cantidad)}
                />
              ))}
        </div>
      </section>

      <section className="w-full pt-16">
        <div
          className={`flex flex-wrap gap-8 items-end justify-center ${
            selectedVehicle === "autobuses" ? "block" : "hidden"
          }`}
        >
          <div>
            <h3 className="font-bold text-4xl">Buseta</h3>
            {vehiculos &&
              vehiculos
                .filter((vehiculo) => vehiculo.tipo_vehiculo === "Buseta")
                .slice(0, 1)
                .map((vehiculo, index) => (
                  <AutoCard
                    key={index}
                    image={vehiculo.imagen_url}
                    marca={vehiculo.marca}
                    anno={Number(vehiculo.año)}
                    modelo={vehiculo.modelo}
                    tipo_combustible={vehiculo.tipo_combustible}
                    tipo_transmision={vehiculo.tipo_transmision}
                    id={vehiculo.id_vehiculo}
                    onEliminar={handleEliminarVehiculo}
                    onActualizar={handleActualizarVehiculo}
                    tipo_vehiculo={vehiculo.tipo_vehiculo}
                    cantidad={Number(vehiculo.cantidad)}
                  />
                ))}
          </div>

          {vehiculos &&
            vehiculos
              .filter((vehiculo) => vehiculo.tipo_vehiculo === "Buseta")
              .slice(1)
              .map((vehiculo, index) => (
                <AutoCard
                  key={index}
                  image={vehiculo.imagen_url}
                  marca={vehiculo.marca}
                  anno={Number(vehiculo.año)}
                  modelo={vehiculo.modelo}
                  tipo_combustible={vehiculo.tipo_combustible}
                  tipo_transmision={vehiculo.tipo_transmision}
                  id={vehiculo.id_vehiculo}
                  onEliminar={handleEliminarVehiculo}
                  onActualizar={handleActualizarVehiculo}
                  tipo_vehiculo={vehiculo.tipo_vehiculo}
                  cantidad={Number(vehiculo.cantidad)}
                />
              ))}
        </div>
      </section>
    </main>
  );
}

export default VehiclePage;
