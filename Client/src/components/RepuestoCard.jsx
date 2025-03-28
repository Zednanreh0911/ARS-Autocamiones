import PropTypes from "prop-types";

RepuestoCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  marca: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
};

function RepuestoCard({ image, name, marca, precio }) {
  return (
    <article className="max-w-96 md:max-w-80 xl:max-w-96 h-fit rounded-2xl overflow-hidden shadow-2xl mt-4">
      <img className="w-full max-h-64 max-w-96" src={image} alt="auto1" />
      <section className="text-left p-4">
        <header className="border-b border-gray-300 pb-4">
          <h2 className="text-orange-500 text-sm">{marca}</h2>
          <h3 className="font-medium text-xl mt-2 text-center">{name}</h3>
          <p className="text-orange-500 text-base font-medium mt-2">$ {precio}</p>
        </header>

        <button className="border rounded-xl border-transparent hover:border-orange-500 ease-in-out duration-300 mt-4 flex items-center gap-2 p-3">
          Ver detalles{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#f97316"
          >
            <path d="m560-242-43-42 168-168H160v-60h525L516-681l43-42 241 241-240 240Z" />
          </svg>
        </button>
      </section>
    </article>
  );
}

export default RepuestoCard;
