import PropTypes from "prop-types";

LogroCard.propTypes = {
  titulo: PropTypes.string.isRequired,
  cantidad: PropTypes.string.isRequired,
  icono: PropTypes.element.isRequired,
};

function LogroCard({ titulo, cantidad, icono }) {
  return (
    <div className="border-2 max-w-fit flex flex-col items-center py-14 px-20 rounded-xl shadow-2xl">
      {icono}
      <p className="text-6xl mt-4">{cantidad}</p>
      <h3 className="mt-4 text-xl">{titulo}</h3>
    </div>
  );
}

export default LogroCard;
