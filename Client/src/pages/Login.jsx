import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../api/axios";
import auto2 from "../assets/auto2.jpg";

function Login() {
  const { register, handleSubmit } = useForm();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await loginUsuario({
        user: data.user,
        password: data.password,
      });

      if (response.code === 200) {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      if (error.response) {
        // El servidor respondió con un código de error (401, 500, etc.)
        console.error(
          "Error en la autenticación:",
          error.response.data.message
        );
        alert(error.response.data.message || "Error en la autenticación");
      } else if (error.request) {
        // No se recibió respuesta del servidor
        console.error("No se recibió respuesta del servidor:", error.request);
        alert("No se pudo conectar al servidor");
      } else {
        // Otro tipo de error
        console.error("Error desconocido:", error.message);
        alert("Ocurrió un error inesperado");
      }
    }
  });

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover"
      style={{ backgroundImage: `url(${auto2})` }}
    >
      <div className="absolute z-[1] w-full h-full bg-black opacity-60"></div>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md z-[2]">
        <h2 className="text-2xl font-bold text-center">Autenticación</h2>
        <form className="text-center space-y-6" onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              {...register("user", { required: true })}
              placeholder="Usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
