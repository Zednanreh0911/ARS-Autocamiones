import { useState } from "react";

function Admin() {
  const [category, setCategory] = useState("Vehículos");
  const [reportes, setReportes] = useState("");
  const manejoDeCategoria = (e) => {
    setCategory(e.target.innerText);
  };
  const reporte = (e) => {
    setReportes(e.target.innerText);
  };

  return (
    <main className="mt-[138px] w-full h-screen flex">
      <aside className="w-1/6 h-screen bg-black pt-4 opacity-90">
        <ul className="text-center text-2xl gap-4 flex flex-col font-bold">
          <li>
            <button
              onClick={manejoDeCategoria}
              className={`cursor-pointer hover:text-orange-500 ease-in-out duration-300 ${
                category === "Vehículos" ? "text-orange-500" : "text-white"
              }`}
            >
              Vehículos
            </button>
          </li>
          <li>
            <button
              onClick={manejoDeCategoria}
              className={`cursor-pointer hover:text-orange-500 ease-in-out duration-300 ${
                category === "Repuestos" ? "text-orange-500" : "text-white"
              }`}
            >
              Repuestos
            </button>
          </li>
          <li>
            <button
              onClick={manejoDeCategoria}
              className={`cursor-pointer hover:text-orange-500 ease-in-out duration-300 ${
                category === "Usuarios" ? "text-orange-500" : "text-white"
              }`}
            >
              Usuarios
            </button>
          </li>
          <li>
            <button
              onClick={manejoDeCategoria}
              className={`cursor-pointer hover:text-orange-500 ease-in-out duration-300 ${
                category === "Reportes" ? "text-orange-500" : "text-white"
              }`}
            >
              Reportes
            </button>
          </li>
        </ul>
      </aside>
      <section className="flex items-center flex-col w-5/6 h-screen p-4">
        <h1 className="text-4xl text-center font-bold">{category}</h1>
        <form
          className={`mt-2 p-5 w-96 flex flex-col gap-4 items-center text-center shadow-md rounded-lg ${
            category === "Vehículos" ? "block" : "hidden"
          }`}
        >
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
          <select className="border rounded-md w-full p-2 mt-2 cursor-pointer">
            <option value="" disabled selected>
              Tipo de combustible
            </option>
            <option value="Diesel">Diesel</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Hibrido">Hibrido</option>
          </select>
          <select className="border rounded-md w-full p-2 mt-2 cursor-pointer">
            <option value="" disabled selected>
              Tipo de Transmisión
            </option>
            <option value="Sincrónico">Sincrónico</option>
            <option value="Automático">Automático</option>
          </select>
          <label
            className="bg-orange-500 text-white w-full p-2 rounded-md cursor-pointer"
            htmlFor="imgvehiculo"
          >
            {" "}
            Agrega la imagen del vehiculo
            <input
              id="imgvehiculo"
              className="hidden"
              type="file"
              accept="image/*"
              placeholder="Imagen del Vehiculo"
            />
          </label>

          <button
            className="text-black border-2 hover:bg-orange-400 hover:text-white ease-in-out duration-300 px-8 py-2 rounded-md cursor-pointer"
            type="submit"
          >
            Publicar
          </button>
        </form>

        <form
          className={`mt-2 p-5 w-96 flex flex-col gap-4 items-center text-center shadow-md rounded-lg ${
            category === "Repuestos" ? "block" : "hidden"
          }`}
        >
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
          <select className="border rounded-md w-full p-2 mt-2 cursor-pointer">

            <option value="" disabled selected>
              Seleccione la categoria
            </option>
            <option value="Diesel">Internos</option>
            <option value="Gasolina">Externos</option>
          </select>
          <label
            className="bg-orange-500 text-white w-full p-2 rounded-md cursor-pointer"
            htmlFor="imgvehiculo"
          >
            {" "}
            Agrega la imagen del Repuesto
            <input
              id="imgvehiculo"
              className="hidden"
              type="file"
              accept="image/*"
              placeholder="Imagen del Vehiculo"
            />
          </label>

          <button
            className="text-black border-2 hover:bg-orange-400 hover:text-white ease-in-out duration-300 px-8 py-2 rounded-md cursor-pointer"
            type="submit"
          >
            Publicar
          </button>
        </form>
        <form
          className={`mt-2 p-5 w-96 flex flex-col gap-4 items-center text-center shadow-md rounded-lg ${
            category === "Usuarios" ? "block" : "hidden"
          }`}
        >
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
            className="text-black border-2 hover:bg-orange-400 hover:text-white ease-in-out duration-300 px-8 py-2 rounded-md cursor-pointer"
            type="submit"
          >
            Crear
          </button>
          <button className="text-black border-2 hover:bg-orange-400 hover:text-white ease-in-out duration-300 px-8 py-2 rounded-md cursor-pointer">
            Usuarios Creados
          </button>
        </form>
        <div
          className={`mt-2 p-5 w-96 flex flex-col gap-4 items-center text-center shadow-md rounded-md ${
            category === "Reportes" ? "block" : "hidden"
          }`}
        >
          <button
            onClick={reporte}
            className={`text-black border-2 hover:bg-orange-400 hover:text-white ease-in-out duration-300 px-8 py-2 rounded-md cursor-pointer ${
              reportes === "Inventario" ? "bg-orange-400 text-white" : "bg-none"
            }`}
          >
            Inventario
          </button>
          <button
            onClick={reporte}
            className={`text-black border-2 hover:bg-orange-400 hover:text-white ease-in-out duration-300 px-8 py-2 rounded-md cursor-pointer ${
              reportes === "Ventas" ? "bg-orange-400 text-white" : "bg-none"
            }`}
          >
            Ventas
          </button>
          <button className="text-black border-2 hover:bg-orange-400 hover:text-white ease-in-out duration-300 px-8 py-2 rounded-md cursor-pointer">
            Usuarios
          </button>

          <div
            className={`mt-10 ${
              reportes === "Inventario" ? "block" : "hidden"
            }`}
          >
            <select className="border rounded-md w-full p-2 mt-2 cursor-pointer">
              <option value="" disabled selected>
                Seleccione reporte a generar
              </option>
              <option value="Vehículos">Vehículos</option>
              <option value="Repuestos">Repuestos</option>
              <option value="Vehículos y Repuestos">
                Vehículos y Repuestos
              </option>
            </select>

            <button className="mt-2 text-black border-2 hover:bg-orange-400 hover:text-white ease-in-out duration-300 px-8 py-2 rounded-md cursor-pointer text-center inline">
              Generar Reporte
            </button>
          </div>

          <div
            className={`text-center mt-10 ${
              reportes === "Ventas" ? "block" : "hidden"
            }`}
          >
            <select className="border rounded-md w-full p-2 mt-2 mb-2 cursor-pointer">
              <option value="" disabled selected>
                Seleccione reporte a generar
              </option>
              <option value="Vehículos">Vehículos</option>
              <option value="Repuestos">Repuestos</option>
              <option value="Vehículos y Repuestos">
                Vehíchulos y Repuestos
              </option>
            </select>
            <label htmlFor="desde">
              <h2 className="text-left">Seleccione fecha desde:</h2>
              <input
                id="desde"
                className="border rounded-md w-full p-2 mb-2 cursor-pointer"
                type="date"
              />
            </label>
            <label htmlFor="hasta">
              <h2 className="text-left">Hasta:</h2>
              <input
                id="hasta"
                className="border rounded-md w-full p-2 mb-2 cursor-pointer"
                type="date"
              />
            </label>
            <button className="mt-2 text-black border-2 hover:bg-orange-400 hover:text-white ease-in-out duration-300 px-8 py-2 rounded-md cursor-pointer text-center inline">
              Generar Reporte
            </button>
          </div>

          <div
            className={`mt-10 ${reportes === "Usuarios" ? "block" : "hidden"}`}
          ></div>
        </div>
      </section>
    </main>
  );
}

export default Admin;
