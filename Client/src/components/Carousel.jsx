import { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";

function Carousel({ images }) {
  const [porcentaje, setPorcentaje] = useState(0);
  const cantidadImagenes = images.length;
  const carouselRef = useRef(null);
  // Touch state
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

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

  // Touch/Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          imagenSiguiente();
        } else {
          imagenAnterior();
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      imagenSiguiente();
    }, 3000);

    return () => clearInterval(interval);
  }, [imagenSiguiente]);
  return (
    <section className="container mx-auto h-auto">
      <figure className="relative w-full h-96 bg-white rounded-xl overflow-hidden">
        <ul
          ref={carouselRef}
          className="h-full flex transition-all ease-out duration-300 touch-pan-x select-none"
          style={{
            width: `${cantidadImagenes * 100}%`,
            transform: `translateX(${porcentaje}%)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((image, index) => (
            <li style={{ width: `${100 / cantidadImagenes}%` }} key={index}>
              <img
                key={index}
                className="w-full h-full object-cover"
                src={image}
                alt={`auto${index + 1}`}
                draggable={false}
              />
            </li>
          ))}
        </ul>
        {/* Botones solo en escritorio */}
        <button
          onClick={imagenAnterior}
          className="hidden md:flex items-center justify-center absolute top-1/2 left-4 -translate-y-1/2 text-4xl font-bold p-2 select-none rounded-full transition-all duration-300 bg-[#333333d4] text-white hover:bg-[#aca8a8d4] hover:text-black shadow-lg z-1"
          aria-label="Anterior"
        >
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
        <button
          onClick={imagenSiguiente}
          className="hidden md:flex items-center justify-center absolute top-1/2 right-4 -translate-y-1/2 text-4xl font-bold p-2 select-none rounded-full bg-[#333333d4] transition-all duration-300 text-white hover:bg-[#aca8a8d4] hover:text-black shadow-lg z-1"
          aria-label="Siguiente"
        >
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
      </figure>
    </section>
  );
}

export default Carousel;

Carousel.propTypes = { images: PropTypes.arrayOf(PropTypes.string).isRequired };
