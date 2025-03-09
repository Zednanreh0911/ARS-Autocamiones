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
                category === "Reportes" ? "text-orange-500" : "text-black"
              }`}
            >
              Reportes
            </button>
          </li>
        </ul>
      </aside>
      <section className="flex items-center flex-col w-5/6 h-screen border-2 border-red-700">
        <h1 className="text-4xl text-center font-bold">{category}</h1>
        <form className={`mt-2 p-5 w-96 flex flex-col gap-4 items-center text-center ${category === "Vehículos" ? "block" : "hidden"}`}>
          <input
            className="border rounded-md w-full p-2"
            type="text"
            placeholder="Marca"
          />
          <input
            className="border rounded-md w-full p-2"
            type="text"
            placeholder="Modelo"
          />
          <select className="border rounded-md w-full p-2 mt-2">
            <option value="" disabled selected>Tipo de combustible</option>
            <option value="Diesel">Diesel</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Hibrido">Hibrido</option>
          </select>
          <select className="border rounded-md w-full p-2 mt-2">
            <option value="" disabled selected>Tipo de Transmisión</option>
            <option value="Sincrónico">Sincrónico</option>
            <option value="Automático">Automático</option>
          </select>
          <label 
          className="bg-orange-500 text-white w-full p-2 rounded-md cursor-pointer"
          htmlFor="imgvehiculo"> Agrega la imagen del vehiculo
            <input 
              id="imgvehiculo"
              className="hidden" 
              type="file"
              accept="image/*"
              placeholder="Imagen del Vehiculo" />
          </label>
          
          <button
          className= "text-black border-2 hover:bg-orange-400 hover:text-white ease-in-out duration-300 px-8 py-2 rounded-md cursor-pointer"
          type="submit">
            Publicar
          </button>
        </form>

        <form className={`mt-2 p-5 w-96 flex flex-col gap-4 items-center text-center ${category === "Repuestos" ? "block" : "hidden"}`}>
          <input
            className="border rounded-md w-full p-2"
            type="text"
            placeholder="Marca"
          />
          <input
            className="border rounded-md w-full p-2"
            type="text"
            placeholder="Nombre del repuesto"
          />
          <input
            className="border rounded-md w-full p-2"
            type="number"
            placeholder="Precio"
          />
          <select className="border rounded-md w-full p-2 mt-2">
            <option value="" disabled selected>Seleccione la categoria</option>
            <option value="Diesel">Internos</option>
            <option value="Gasolina">Externos</option>
          </select>
          <label 
          className="bg-orange-500 text-white w-full p-2 rounded-md cursor-pointer"
          htmlFor="imgvehiculo"> Agrega la imagen del Repuesto
            <input 
              id="imgvehiculo"
              className="hidden" 
              type="file"
              accept="image/*"
              placeholder="Imagen del Vehiculo" />
          </label>
          
          <button
          className= "text-black border-2 hover:bg-orange-400 hover:text-white ease-in-out duration-300 px-8 py-2 rounded-md cursor-pointer"
          type="submit">
            Publicar
          </button>
        </form>

        <form className={`mt-2 p-5 w-96 flex flex-col gap-4 items-center text-center ${category === "Usuarios" ? "block" : "hidden"}`}>
          <input
            className="border rounded-md w-full p-2"
            type="text"
            placeholder="Nombre de usuario"
          />
          <input
            className="border rounded-md w-full p-2"
            type="password"
            placeholder="Contraseña"
          />
          <button
          className= "text-black border-2 hover:bg-orange-400 hover:text-white ease-in-out duration-300 px-8 py-2 rounded-md cursor-pointer"
          type="submit">
            Crear
          </button>
        </form>
      </section>
    </main>
  );
}

export default Admin;
