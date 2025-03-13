import AutoCard from "../components/AutoCard";
import carro1 from "../assets/auto3.jpg";
import carro2 from "../assets/auto2.jpg";
import { useState, useRef } from "react";

function VehiclePage() {
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
            <AutoCard image={carro1} />
          </div>

          <AutoCard image={carro1} />
          <AutoCard image={carro1} />
          <AutoCard image={carro1} />
          <AutoCard image={carro1} />
          <AutoCard image={carro1} />
          <AutoCard image={carro1} />
          <AutoCard image={carro1} />
        </div>
      </section>

      <section className="w-full pt-16">
        <div
          className={`flex flex-wrap gap-8 items-end justify-center ${
            selectedVehicle === "autobuses" ? "block" : "hidden"
          }`}
        >
          <div>
            <h3 className="font-bold text-4xl">Autobuses</h3>
            <AutoCard image={carro2} />
          </div>

          <AutoCard image={carro2} />
          <AutoCard image={carro2} />
          <AutoCard image={carro2} />
          <AutoCard image={carro2} />
          <AutoCard image={carro2} />
          <AutoCard image={carro2} />
          <AutoCard image={carro2} />
        </div>
      </section>
    </main>
  );
}

export default VehiclePage;
