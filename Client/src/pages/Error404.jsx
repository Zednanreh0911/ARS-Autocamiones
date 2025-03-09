import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Error404() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    const timeoutId = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [navigate]);
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <section className="p-4 bg-gray-100 rounded-lg shadow-lg text-center">
        <h1 className="text-orange-500 font-extrabold text-8xl">Error 404</h1>
        <p className="font-bold text-lg">Ruta no encontrada...</p>
        <p className="text-lg">
          Redirigiendo a la página de inicio en{" "}
          <span className="font-bold">{countdown}</span> segundos...
        </p>
      </section>
    </div>
  );
}

export default Error404;
