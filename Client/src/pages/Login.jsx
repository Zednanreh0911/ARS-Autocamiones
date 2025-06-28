// import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../api/axios";
import auto2 from "../assets/auto2.jpg";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/useAuth";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const timeoutRef = useRef(null);
  const { login } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await loginUsuario({
        user: data.user,
        password: data.password,
      });
      if (response.code === 200) {
        // Suponiendo que el backend retorna el rol en response.rol
        console.log("Rol del usuario:", response.rol);
        login(response.rol || "admin");
        navigate("/admin");
      }
    } catch (error) {
      let mensaje = "";
      if (error.response) {
        mensaje =
          error.response.data?.message ||
          error.response.data?.error ||
          "Error en la autenticación";
      } else if (error.request) {
        mensaje = "No se pudo conectar al servidor";
      } else {
        mensaje = "Ocurrió un error inesperado";
      }
      setErrorMsg(mensaje);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => setErrorMsg(""), 5000);
    }
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover"
      style={{ backgroundImage: `url(${auto2})` }}
    >
      <div className="absolute z-[1] w-full h-full bg-black opacity-60"></div>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md z-[2]">
        <h2 className="text-2xl font-bold text-center">Autenticación</h2>
        {errorMsg && (
          <div
            className="bg-red-500 text-white text-center py-2 px-4 rounded mb-4 transition-opacity duration-500 opacity-100"
            style={{
              animation: "fadeOut 0.5s linear 4.5s forwards",
            }}
            aria-live="assertive"
          >
            {errorMsg}
          </div>
        )}

        <form className="text-center space-y-6" onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              {...register("user", { required: true })}
              placeholder="Usuario"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Contraseña"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            style={{
              "--before-content": `"Ingresar"`,
            }}
            className={`relative border-[3px] py-2 px-10 border-black rounded-full font-bold mt-12 text-2xl bg-orange-500 before:content-[var(--before-content)] before:absolute before:w-[102%] before:h-[110%] before:top-[-25%] before:left-[-1%] before:bg-white before:flex before:items-center before:justify-center before:border-[3px] before:border-black before:rounded-full before:transition-all before:duration-300 before:ease hover:before:top-[-8%]`}
          >
            {"Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
