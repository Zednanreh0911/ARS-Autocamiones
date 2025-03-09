import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    console.log(`Jeison info: ${data.email} ${data.password}`);
    navigate("/admin");
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Autenticación</h2>
        <form className="text-center space-y-6" onSubmit={onSubmit}>
          <div>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Contraseña"
              id="password"
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
