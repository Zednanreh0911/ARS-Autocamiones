import { useState } from "react";

function Admin() {
  const [category, setCategory] = useState("Vehículos");
  const manejoDeCategoria = (e) => {
    setCategory(e.target.innerText);
  };

  return (
    <main className="mt-40 w-full h-screen flex">
      <aside className="w-1/6 h-screen border-2 border-blue-700">
        <ul className="text-center text-2xl gap-4 flex flex-col font-bold">
          <li>
            <button
              onClick={manejoDeCategoria}
              className={`cursor-pointer hover:text-orange-500 ease-in-out duration-300 ${
                category === "Vehículos" ? "text-orange-500" : "text-black"
              }`}
            >
              Vehículos
            </button>
          </li>
          <li>
            <button
              onClick={manejoDeCategoria}
              className={`cursor-pointer hover:text-orange-500 ease-in-out duration-300 ${
                category === "Repuestos" ? "text-orange-500" : "text-black"
              }`}
            >
              Repuestos
            </button>
          </li>
          <li>
            <button
              onClick={manejoDeCategoria}
              className={`cursor-pointer hover:text-orange-500 ease-in-out duration-300 ${
                category === "Usuarios" ? "text-orange-500" : "text-black"
              }`}
            >
              Usuarios
            </button>
          </li>
          <li>
            <button
              onClick={manejoDeCategoria}
              className={`cursor-pointer hover:text-orange-500 ease-in-out duration-300 ${
                category === "PDF" ? "text-orange-500" : "text-black"
              }`}
            >
              PDF
            </button>
          </li>
        </ul>
      </aside>
      <section className="w-5/6 h-screen border-2 border-red-700">
        <h1 className="text-4xl text-center font-bold">{category}</h1>
        <form className="">
        <input
            className="ml-48 border rounded-md w-full p-2"
            type="text"
            placeholder="Marca"
          />
          <input
            className="ml-48 border rounded-md w-full p-2"
            type="text"
            placeholder="Modelo"
          />

          <select className="ml-48 border rounded-md w-full p-2 mt-2">
            <option value="" disabled selected>Tipo de combustible</option>
            <option value="Diesel">Diesel</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Hibrido">Hibrido</option>
          </select>
          <select className="ml-48 border rounded-md w-full p-2 mt-2">
            <option value="" disabled selected>Tipo de Transmisión</option>
            <option value="Sincrónico">Sincrónico</option>
            <option value="Automático">Automático</option>
          </select>
        </form>
      </section>
    </main>
  );
}

export default Admin;
