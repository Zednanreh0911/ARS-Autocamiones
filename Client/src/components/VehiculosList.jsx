import VehiculoCard from "../components/VehiculoCard";

function VehiculosList({ Vehiculos }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Vehiculos.map((Vehiculo) => (
        <VehiculoCard Vehiculo={Vehiculo} key={Vehiculo._id} />
      ))}
    </div>
  );
}

export default VehiculosList;
