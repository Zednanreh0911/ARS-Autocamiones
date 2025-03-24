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

  return (
    <main className="mt-40">
      <section
        ref={vehiculosRef}
        className="w-full flex flex-wrap justify-evenly gap-8"
      >
        <button
          onClick={() => handleSelectVehicle("camionetas")}
          className="relative overflow-hidden rounded-lg max-[470px]:mx-4"
        >
          <img
            className="transition-transform duration-300 ease-in-out transform hover:scale-110 w-[450px] min-[1350px]:w-full"
            src={carro1}
            alt="camionetas img"
          />
          <span className="absolute bottom-2 right-4 font-bold text-xl">
            Camionetas
          </span>
        </button>
        <button
          className="relative overflow-hidden rounded-lg max-[470px]:mx-4"
          onClick={() => handleSelectVehicle("autobuses")}
        >
          <img
            className="transition-transform duration-300 ease-in-out transform hover:scale-110 w-[450px] min-[1350px]:w-full"
            src={carro2}
            alt="autobus img"
          />
          <span className="absolute bottom-2 left-4 font-bold text-xl">
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
                .filter((vehiculo) => vehiculo.tipo === "Camioneta")
                .slice(0, 1)
                .map((vehiculo, index) => (
                  <AutoCard
                    key={index}
                    image={vehiculo.img}
                    marca={vehiculo.marca}
                    year={vehiculo.year}
                    model={vehiculo.model}
                    combus={vehiculo.combus}
                    trans={vehiculo.trans}
                  />
                ))}
          </div>

          {vehiculos &&
            vehiculos
              .filter((vehiculo) => vehiculo.tipo === "Camioneta")
              .slice(1)
              .map((vehiculo, index) => (
                <AutoCard
                  key={index}
                  image={vehiculo.img}
                  marca={vehiculo.marca}
                  year={vehiculo.year}
                  model={vehiculo.model}
                  combus={vehiculo.combus}
                  trans={vehiculo.trans}
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
                .filter((vehiculo) => vehiculo.tipo === "Buseta")
                .slice(0, 1)
                .map((vehiculo, index) => (
                  <AutoCard
                    key={index}
                    image={vehiculo.img}
                    marca={vehiculo.marca}
                    year={vehiculo.year}
                    model={vehiculo.model}
                    combus={vehiculo.combus}
                    trans={vehiculo.trans}
                  />
                ))}
          </div>

          {vehiculos &&
            vehiculos
              .filter((vehiculo) => vehiculo.tipo === "Buseta")
              .slice(1)
              .map((vehiculo, index) => (
                <AutoCard
                  key={index}
                  image={vehiculo.img}
                  marca={vehiculo.marca}
                  year={vehiculo.year}
                  model={vehiculo.model}
                  combus={vehiculo.combus}
                  trans={vehiculo.trans}
                />
              ))}
        </div>
      </section>
    </main>
  );
}

export default VehiclePage;
