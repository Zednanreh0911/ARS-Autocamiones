import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

Carousel.propTypes = { images: PropTypes.arrayOf(PropTypes.string).isRequired };

function Carousel({ images }) {
  const [porcentaje, setPorcentaje] = useState(0);
  const cantidadImagenes = images.length;

  const imagenSiguiente = useCallback(() => {
    const nuevoProcentaje = porcentaje - 100 / cantidadImagenes;

    if (nuevoProcentaje <= -99) {
      setPorcentaje(0);
      return;
    }
    const fijo = Number(nuevoProcentaje.toFixed(2));

    setPorcentaje(fijo);
  }, [porcentaje, cantidadImagenes]);

  const imagenAnterior = useCallback(() => {
    const nuevoProcentaje = porcentaje + 100 / cantidadImagenes;

    if (nuevoProcentaje > 1) {
      const fijo = Number((-100 + 100 / cantidadImagenes).toFixed(2));

      setPorcentaje(fijo);
      return;
    }

    const fijo = Number(nuevoProcentaje.toFixed(2));
    setPorcentaje(fijo);
  }, [porcentaje, cantidadImagenes]);

  useEffect(() => {
    const interval = setInterval(() => {
      imagenSiguiente();
    }, 3000);

    return () => clearInterval(interval);
  }, [imagenSiguiente]);
  return (
    <section className="w-full h-auto px-8">
      <figure className="relative w-full h-96 bg-white rounded-xl overflow-hidden">
        <ul
          className="h-full flex transition-all ease-out duration-300"
          style={{
            width: `${cantidadImagenes * 100}%`,
            transform: `translateX(${porcentaje}%)`,
          }}
        >
          {images.map((image, index) => (
            <li style={{ width: `${100 / cantidadImagenes}%` }} key={index}>
              <img
                key={index}
                className="w-full h-full object-cover"
                src={image}
                alt={`auto${index + 1}`}
              />
            </li>
          ))}
        </ul>
        <button
          onClick={imagenSiguiente}
          className="absolute top-2/4 text-4xl font-bold p-1 right-2 select-none rounded-full bg-[#333333d4] transition-all duration-300 text-white hover:bg-[#aca8a8d4] hover:text-black"
        >
          {/* Icono de flecha derecha */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <button
          onClick={imagenAnterior}
          className="absolute top-2/4 text-4xl font-bold p-1 left-2 select-none rounded-full transition-all duration-300 bg-[#333333d4] text-white hover:bg-[#aca8a8d4] hover:text-black"
        >
          {/* Icono de flecha izquierda */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </figure>
    </section>
  );
}

export default Carousel;
