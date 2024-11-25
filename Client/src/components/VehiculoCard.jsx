import { useNavigate } from "react-router-dom";

function VehiculoCard({ Vehiculo }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-zinc-950 p-4 hover:cursor-pointer hover:bg-gray-950"
      onClick={() => {
        navigate(`/vehiculos/${Vehiculo._id}`);
      }}
    >
      <h2>{Vehiculo.name}</h2>
      <p>{Vehiculo.desc}</p>
    </div>
  );
}

export default VehiculoCard;
