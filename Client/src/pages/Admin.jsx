import { useState } from "react";
import { useForm } from "react-hook-form";
import { crearRepuesto, crearVehiculo, crearUsuario } from "../api/axios";
import DialogoAfirmativo from "../components/DialogoAfirmativo";

function Admin() {
  const [category, setCategory] = useState("");
  const [reportes, setReportes] = useState("");
  const { register: registerRepuesto, handleSubmit: handleSubmitRepuesto } =
    useForm();
  const { register: registerVehiculo, handleSubmit: handleSubmitVehiculo } =
    useForm();
  const { register: registerUsuario, handleSubmit: handleSubmitUsuario } =
    useForm();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const manejoDeCategoria = (e) => {
    setCategory(e.target.innerText);
  };
  const reporte = (e) => {
    setReportes(e.target.innerText);
  };

  const subirVehiculo = handleSubmitVehiculo((data) => {
    const formData = new FormData();
    formData.append("imgvehiculo", data.img[0]);
    formData.append("marca", data.marca);
    formData.append("year", data.anno);
    formData.append("tipo", data.categoria);
    formData.append("combus", data.combustible);
    formData.append("trans", data.transmision);
    formData.append("model", data.modelo);
    console.log(
      `Jeison info: ${data.marca} ${data.combustible} ${data.transmision} ${data.modelo} ${data.anno} ${data.img} ${data.categoria}`
    );

    crearVehiculo(formData).then(() => {
      setIsDialogOpen(true);
    });
  });

  const subirRepuesto = handleSubmitRepuesto((data) => {
    const formData = new FormData();
    formData.append("imgRepuesto", data.imgRepuesto[0]);
    formData.append("marca", data.marcaRepuesto);
    formData.append("name", data.nombreRepuesto);
    formData.append("precio", data.precioRepuesto);
    formData.append("cantidad", data.cantidadRepuesto);
    formData.append("cat", data.categoriaRepuesto);
    console.log(
      `Jeison info: ${data.marcaRepuesto} ${data.nombreRepuesto} ${data.precioRepuesto} ${data.cantidadRepuesto} ${data.imgRepuesto} ${data.categoriaRepuesto}`
    );
    crearRepuesto(formData).then(() => {
      setIsDialogOpen(true);
    });
  });

  const subirUsuario = handleSubmitUsuario((data) => {
    console.log(`Jeison info: ${data.name} ${data.password}`);
    crearUsuario({
      name: data.name,
      password: data.password,
    }).then(() => {
      setIsDialogOpen(true);
    });
  });

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
        <DialogoAfirmativo isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}>
          ¡Operacion exitosa!
        </DialogoAfirmativo>
        <h1 className="text-4xl text-center font-bold">{category}</h1>
        {/* form de vehiculos */}
        <form
          onSubmit={subirVehiculo}
          className={`mt-2 p-5 w-96 flex flex-col gap-4 items-center text-center shadow-md rounded-lg ${
            category === "Vehículos" ? "block" : "hidden"
          }`}
        >
          <select
            className="border rounded-md w-full p-2 mt-2 cursor-pointer"
            {...registerVehiculo("marca", { required: true })}
            defaultValue={""}
          >
            <option value="" disabled>
              Marca
            </option>
            <option value="Encava">Encava</option>
            <option value="Isuzu">Isuzu</option>
          </select>
          <input
            className="border rounded-md w-full p-2"
            type="number"
            placeholder="Año"
            {...registerVehiculo("anno", { required: true })}
          />
          <input
            className="border rounded-md w-full p-2"
            type="text"
            placeholder="Modelo"
            {...registerVehiculo("modelo", { required: true })}
          />
          <select
            className="border rounded-md w-full p-2 mt-2 cursor-pointer"
            {...registerVehiculo("categoria", { required: true })}
            defaultValue={""}
          >
            <option value="" disabled>
              Categoria
            </option>
            <option value="Buseta">Buseta</option>
            <option value="Camioneta">Camioneta</option>
          </select>
          <select
            className="border rounded-md w-full p-2 mt-2 cursor-pointer"
            {...registerVehiculo("combustible", { required: true })}
            defaultValue={""}
          >
            <option value="" disabled>
              Tipo de combustible
            </option>
            <option value="Diesel">Diesel</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Hibrido">Hibrido</option>
          </select>
          <select
            className="border rounded-md w-full p-2 mt-2 cursor-pointer"
            {...registerVehiculo("transmision", { required: true })}
            defaultValue={""}
          >
            <option value="" disabled>
              Tipo de Transmisión
            </option>
            <option value="Manual">Manual</option>
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
              {...registerVehiculo("img", { required: true })}
            />
          </label>

          <button
            className="text-black border-2 hover:bg-orange-400 hover:text-white ease-in-out duration-300 px-8 py-2 rounded-md cursor-pointer"
            type="submit"
          >
            Publicar
          </button>
        </form>
        {/* form de repuestos */}
        <form
          onSubmit={subirRepuesto}
          className={`mt-2 p-5 w-96 flex flex-col gap-4 items-center text-center shadow-md rounded-lg ${
            category === "Repuestos" ? "block" : "hidden"
          }`}
        >
          <input
            className="border rounded-md w-full p-2"
            type="text"
            placeholder="Marca"
            {...registerRepuesto("marcaRepuesto", { required: true })}
          />
          <input
            className="border rounded-md w-full p-2"
            type="text"
            placeholder="Nombre del repuesto"
            {...registerRepuesto("nombreRepuesto", { required: true })}
          />
          <input
            className="border rounded-md w-full p-2"
            type="number"
            placeholder="Precio"
            min="0" // No permite valores menores a 0
            {...registerRepuesto("precioRepuesto", { required: true, min: 0 })}
          />
          <input
            className="border rounded-md w-full p-2"
            type="number"
            placeholder="Cantidad"
            min="0" // No permite valores menores a 0
            {...registerRepuesto("cantidadRepuesto", {
              required: true,
              min: 0,
            })}
          />
          <select
            className="border rounded-md w-full p-2 mt-2 cursor-pointer"
            {...registerRepuesto("categoriaRepuesto", { required: true })}
            defaultValue={""}
          >
            <option value="" disabled>
              Seleccione la categoria
            </option>
            <option value="Internos">Internos</option>
            <option value="Externos">Externos</option>
          </select>
          <label
            className="bg-orange-500 text-white w-full p-2 rounded-md cursor-pointer"
            htmlFor="imgRepuesto"
          >
            {" "}
            Agrega la imagen del Repuesto
            <input
              id="imgRepuesto"
              className="hidden"
              type="file"
              accept="image/*"
              placeholder="Imagen del repuesto"
              {...registerRepuesto("imgRepuesto", { required: true })}
            />
          </label>

          <button
            className="text-black border-2 hover:bg-orange-400 hover:text-white ease-in-out duration-300 px-8 py-2 rounded-md cursor-pointer"
            type="submit"
          >
            Publicar
          </button>
        </form>
        {/* form de usuarios */}
        <form
          onSubmit={subirUsuario}
          className={`mt-2 p-5 w-96 flex flex-col gap-4 items-center text-center shadow-md rounded-lg ${
            category === "Usuarios" ? "block" : "hidden"
          }`}
        >
          <input
            className="border rounded-md w-full p-2"
            type="text"
            placeholder="Nombre de usuario"
            {...registerUsuario("name", { required: true })}
          />
          <input
            className="border rounded-md w-full p-2"
            type="password"
            placeholder="Contraseña"
            {...registerUsuario("password", { required: true })}
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
              <option value="" disabled>
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
              <option value="" disabled>
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
