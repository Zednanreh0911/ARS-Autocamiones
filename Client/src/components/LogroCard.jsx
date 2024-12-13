import PropTypes from "prop-types";

LogroCard.propTypes = {
  titulo: PropTypes.string.isRequired,
  cantidad: PropTypes.string.isRequired,
  icono: PropTypes.element.isRequired,
};

function LogroCard({ titulo, cantidad, icono }) {
  return (
    <div className="border-2 w-full max-w-80 mt-4 md:mt-0 flex flex-col items-center justify-center min-[670px]:py-8 min-[670px]:pz-15  xl:py-14 xl:px-20 rounded-xl shadow-2xl text-center">
      {icono}
      <p className="text-4xl min-[480px]:text-6xl mt-4">{cantidad}</p>
      <h3 className="mt-4 text-lg min-[430px]:text-xl">{titulo}</h3>
    </div>
  );
}

export default LogroCard;
