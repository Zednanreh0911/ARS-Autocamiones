import PropTypes from "prop-types";

AutoCard.propTypes = { image: PropTypes.string.isRequired };

function AutoCard({ image }) {
  return (
    <article className="max-w-96 h-fit rounded-2xl overflow-hidden shadow-2xl">
      <img className="w-full" src={image} alt="auto1" />
      <section className="text-left p-4">
        <header>
          <h2 className="text-orange-500 text-xs">Mini Cooper 3 similar</h2>
          <h3 className="font-medium mt-2">Chevrolet Suburban 2021 mo</h3>
          <p className="text-orange-500 text-sm font-medium mt-2">$27,000</p>
        </header>
        <dl className="grid grid-cols-3 text-sm mt-4 pb-8 border-b border-gray-300">
          <div className="flex justify-evenly">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#000000"
            >
              <path d="M160-120v-660q0-24 18-42t42-18h269q24 0 42 18t18 42v288h65q20.63 0 35.31 14.69Q664-462.63 664-442v219q0 21.68 15.5 36.34Q695-172 717-172t37.5-14.66Q770-201.32 770-223v-295q-11 6-23 9t-24 3q-39.48 0-66.74-27.26Q629-560.52 629-600q0-31.61 18-56.81Q665-682 695-690l-95-95 36-35 153 153q14 14 22.5 30.5T820-600v377q0 43.26-29.82 73.13-29.81 29.87-73 29.87Q674-120 644-149.87q-30-29.87-30-73.13v-219h-65v322H160Zm60-432h269v-228H220v228Zm503-4q18 0 31-13t13-31q0-18-13-31t-31-13q-18 0-31 13t-13 31q0 18 13 31t31 13ZM220-180h269v-312H220v312Zm269 0H220h269Z" />
            </svg>
            <div>
              <dt className="text-gray-400">Combustible</dt>
              <dd>diesel</dd>
            </div>
          </div>
          <div className="flex justify-evenly border-l border-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#000000"
            >
              <path d="M407-325q23 23 66.5 21.5T537-336l216-339-335 219q-30 20-32 64t21 67Zm71-474q57 0 119 18.5T716-717l-52 37q-45-30-96.5-44.5T477.98-739q-140.47 0-239.23 100.22Q140-538.57 140-396.02 140-351 152.5-305q12.5 46 35.5 85h579q22-36 35-84t13-94q0-42-12.5-90.5T758-578l39-52q38 56 57 112.5T875-404q2 60-12 113t-41 98q-12 23-25.5 28t-33.5 5H192q-17 0-33.5-8.5T134-193q-26-48-40-97.5T80-396q0-83 31.5-156.5t85.5-128Q251-735 323.68-767T478-799Zm-9 331Z" />
            </svg>
            <div>
              <dt className="text-gray-400">Km</dt>
              <dd>Nuevo</dd>
            </div>
          </div>
          <div className="flex justify-evenly border-l border-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#000000"
            >
              <path d="M159.88-120Q114-120 82-152.08 50-184.17 50-230q0-38 22.5-67t57.5-39v-288q-35-10-57.5-39T50-730q0-45.83 32.12-77.92 32.12-32.08 78-32.08T238-807.92q32 32.09 32 77.92 0 38-22.5 67T190-624v114h260v-114q-35-10-57.5-39T370-730q0-45.83 32.12-77.92 32.12-32.08 78-32.08T558-807.92q32 32.09 32 77.92 0 38-22.5 67T510-624v114h210q21.25 0 35.63-15Q770-540 770-560v-64q-35-10-57.5-39T690-730q0-45.83 32.12-77.92 32.12-32.08 78-32.08T878-807.92q32 32.09 32 77.92 0 38-22.5 67T830-624v64q0 45-32.08 77.5Q765.83-450 720-450H510v114q35 10 57.5 39t22.5 67q0 45.83-32.12 77.92-32.12 32.08-78 32.08T402-152.08q-32-32.09-32-77.92 0-38 22.5-67t57.5-39v-114H190v114q35 10 57.5 39t22.5 67q0 45.83-32.12 77.92-32.12 32.08-78 32.08Zm.12-60q20 0 35-14.38 15-14.37 15-35.62 0-20-14.32-35-14.33-15-35.5-15-21.18 0-35.68 15T110-229.5q0 20.5 14.38 35Q138.75-180 160-180Zm0-500q20 0 35-14.32 15-14.33 15-35.5 0-21.18-14.32-35.68-14.33-14.5-35.5-14.5-21.18 0-35.68 14.37Q110-751.25 110-730q0 20 14.38 35 14.37 15 35.62 15Zm320 500q20 0 35-14.38 15-14.37 15-35.62 0-20-15-35t-35-15q-20 0-35 15t-15 35.5q0 20.5 15 35t35 14.5Zm0-500q20 0 35-14.32 15-14.33 15-35.5 0-21.18-15-35.68T480-780q-20 0-35 14.32-15 14.33-15 35.5 0 21.18 15 35.68t35 14.5Zm320.5 0q20.5 0 35-14.32 14.5-14.33 14.5-35.5 0-21.18-14.37-35.68Q821.25-780 800-780q-20 0-35 14.32-15 14.33-15 35.5 0 21.18 15 35.68t35.5 14.5ZM160-230Zm0-500Zm320 500Zm0-500Zm320 0Z" />
            </svg>
            <div>
              <dt className="text-gray-400">transmision</dt>
              <dd>automatico</dd>
            </div>
          </div>
        </dl>
        <button className="mt-4 flex items-center gap-2">
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

export default AutoCard;
