import AutoCard from "../components/AutoCard";
import carro1 from "../assets/auto3.jpg";
import carro2 from "../assets/auto2.jpg";
import { useState } from "react";

function VehiclePage() {
  const [selectedVehicle, setSelectedVehicle] = useState("camionetas");

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <main className="mt-40">
      <section className="w-full flex justify-evenly gap-8">
        <button
          onClick={() => handleSelectVehicle("camionetas")}
          className="relative overflow-hidden rounded-lg"
        >
          <img
            className="transition-transform duration-300 ease-in-out transform hover:scale-110"
            src={carro1}
            alt="camionetas img"
          />
          <span className="absolute bottom-2 right-4 font-bold text-xl">
            Camionetas
          </span>
        </button>
        <button
          className="relative overflow-hidden rounded-lg"
          onClick={() => handleSelectVehicle("autobuses")}
        >
          <img
            className="transition-transform duration-300 ease-in-out transform hover:scale-110"
            src={carro2}
            alt="autobus img"
          />
          <span className="absolute bottom-2 left-4 font-bold text-xl">
            autobuses
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
