import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useForm } from "react-hook-form";
import { crearRepuesto, crearVehiculo, crearUsuario } from "../api/axios";
import { obtenerUsuarios, eliminarUsuario } from "../api/axios";
import DialogoAfirmativo from "../components/DialogoAfirmativo";

function Admin() {
  const { userName } = useAuth();
  const [category, setCategory] = useState("");
  const [reportes, setReportes] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);

  const {
    register: registerRepuesto,
    handleSubmit: handleSubmitRepuesto,
    reset: resetRepuesto,
  } = useForm();
  const {
    register: registerVehiculo,
    handleSubmit: handleSubmitVehiculo,
    reset: resetVehiculo,
  } = useForm();
  const {
    register: registerUsuario,
    handleSubmit: handleSubmitUsuario,
    reset: resetUsuario,
  } = useForm();

  const { register: registerReporte, handleSubmit: handleSubmitReporte } =
    useForm();

  const deleteUser = async (id) => {
    try {
      await eliminarUsuario(id);
      setUsuarios((prevUsuarios) =>
        prevUsuarios.filter((usuario) => usuario.id_usuario !== id)
      );
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };
  const toggleUsuarios = async () => {
    if (!mostrarUsuarios) {
      const usuariosData = await obtenerUsuarios();
      setUsuarios(usuariosData);
    }
    setMostrarUsuarios(!mostrarUsuarios);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogError, setDialogError] = useState("");

  const manejoDeCategoria = (e) => {
    setCategory(e.target.innerText);
  };
  const reporte = (e) => {
    setReportes(e.target.innerText);
  };

  const [vehiculoFormKey, setVehiculoFormKey] = useState(
    () => Date.now() + Math.random()
  );
  const [repuestoFormKey, setRepuestoFormKey] = useState(
    () => Date.now() + Math.random()
  );
  const [usuarioFormKey, setUsuarioFormKey] = useState(
    () => Date.now() + Math.random()
  );

  const subirVehiculo = handleSubmitVehiculo((data) => {
    const formData = new FormData();
    formData.append("imgvehiculo", data.img[0]);
    formData.append("marca", data.marca);
    formData.append("anno", data.año);
    formData.append("tipo_vehiculo", data.tipo_vehiculo);
    formData.append("tipo_combustible", data.combustible);
    formData.append("tipo_transmision", data.transmision);
    formData.append("modelo", data.modelo);
    formData.append("cantidad", data.cantidad);
    console.log(
      `Jeison info: ${data.marca} ${data.año} ${data.tipo_vehiculo} ${data.combustible} ${data.transmision} ${data.modelo} ${data.cantidad}`
    );

    crearVehiculo(formData)
      .then(() => {
        setIsDialogOpen(true);
        setDialogError("");
      })
      .catch((error) => {
        setDialogError(
          error?.response?.data?.message ||
            error?.message ||
            "Error al crear el vehículo. Por favor, intente nuevamente."
        );
        setIsDialogOpen(true);
      });
  });

  const subirRepuesto = handleSubmitRepuesto((data) => {
    const formData = new FormData();
    formData.append("imgRepuesto", data.imgRepuesto[0]);
    formData.append("marca", data.marcaRepuesto);
    formData.append("nombre", data.nombreRepuesto);
    formData.append("precio_unitario", data.precioRepuesto);
    formData.append("cantidad", data.cantidadRepuesto);
    formData.append("categoria", data.categoriaRepuesto);
    console.log(
      `Jeison info: ${data.marcaRepuesto} ${data.nombreRepuesto} ${data.precioRepuesto} ${data.cantidadRepuesto} ${data.imgRepuesto} ${data.categoriaRepuesto}`
    );
    crearRepuesto(formData)
      .then(() => {
        setIsDialogOpen(true);
        setDialogError("");
      })
      .catch((error) => {
        setDialogError(
          error?.response?.data?.message ||
            error?.message ||
            "Error al crear el repuesto. Por favor, intente nuevamente."
        );
        setIsDialogOpen(true);
      });
  });

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setDialogError("");
    if (category === "Vehículos") {
      resetVehiculo();
      setVehiculoFormKey(Date.now() + Math.random());
    } else if (category === "Repuestos") {
      resetRepuesto();
      setRepuestoFormKey(Date.now() + Math.random());
    } else if (category === "Usuarios") {
      resetUsuario();
      setUsuarioFormKey(Date.now() + Math.random());
    }
  };

  const subirUsuario = handleSubmitUsuario((data) => {
    console.log(`Jeison info: ${data.name} ${data.password}`);
    crearUsuario({
      name: data.name,
      password: data.password,
    })
      .then((nuevoUsuario) => {
        setIsDialogOpen(true);
        setDialogError("");
        if (mostrarUsuarios) {
          if (nuevoUsuario && nuevoUsuario.id_usuario) {
            setUsuarios((prev) => [...prev, nuevoUsuario]);
          } else {
            obtenerUsuarios().then(setUsuarios);
          }
        }
      })
      .catch((error) => {
        setDialogError(
          error?.response?.data?.message ||
            error?.message ||
            "Error al crear el usuario. Por favor, intente nuevamente."
        );
        setIsDialogOpen(true);
      });
  });

  const handleGenerarReporte = handleSubmitReporte((data) => {
    if (data.reporte === "Vehículos") {
      window.open("/pdf_vehiculos", "_blank");
    } else if (data.reporte === "Repuestos") {
      window.open("/pdf_repuestos", "_blank");
    } else {
      console.log("Reporte seleccionado:", data.reporte);
    }
  });

  return (
    <main className="mt-[138px] w-full h-screen flex">
      <aside className="w-1/6 h-screen bg-black pt-4 opacity-90">
        <ul className="text-center text-2xl gap-4 flex flex-col font-bold">
          {["Vehículos", "Repuestos", "Usuarios", "Reportes"].map((cat) => (
            <li key={cat}>
              <button
                onClick={manejoDeCategoria}
                className={`cursor-pointer hover:text-orange-500 ease-in-out duration-300 ${
                  category === cat ? "text-orange-500" : "text-white"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="flex items-center flex-col w-5/6 h-screen p-4">
        {category === "" && (
          <div className="flex flex-col items-center justify-start h-full w-full">
            <h2 className="text-3xl font-bold mb-2">
              ¡Hola{userName ? `, ${userName}` : ""}!
            </h2>
            <p className="text-lg text-gray-600">
              Selecciona una opción del menú para comenzar.
            </p>
          </div>
        )}
        <DialogoAfirmativo isOpen={isDialogOpen} setIsOpen={handleDialogClose}>
          {dialogError ? (
            <span className="text-red-500 font-semibold">{dialogError}</span>
          ) : (
            "¡Operacion exitosa!"
          )}
        </DialogoAfirmativo>
        <h1 className="text-4xl text-center font-bold">{category}</h1>
        {/* form de vehiculos */}
        <form
          key={vehiculoFormKey}
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
            {...registerVehiculo("año", { required: true })}
          />
          <input
            className="border rounded-md w-full p-2"
            type="text"
            placeholder="Modelo"
            {...registerVehiculo("modelo", { required: true })}
          />
          <select
            className="border rounded-md w-full p-2 mt-2 cursor-pointer"
            {...registerVehiculo("tipo_vehiculo", { required: true })}
            defaultValue={""}
          >
            <option value="" disabled>
              Tipo de vehiculo
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

          <input
            className="border rounded-md w-full p-2"
            type="number"
            placeholder="Cantidad"
            min="0"
            {...registerVehiculo("cantidad", { required: true })}
          />
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
          key={repuestoFormKey}
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
            step="0.01"
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
          key={usuarioFormKey}
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
          <button
            className="text-black border-2 hover:bg-orange-400 hover:text-white ease-in-out duration-300 px-8 py-2 rounded-md cursor-pointer"
            type="button"
            onClick={toggleUsuarios}
          >
            Usuarios Creados
          </button>
          {mostrarUsuarios && (
            <ul className="mt-4 w-full text-left">
              {usuarios.length === 0 ? (
                <li className="text-gray-500 italic text-center py-2">
                  Actualmente no hay usuarios registrados en el sistema.
                </li>
              ) : (
                usuarios.map((usuario) => {
                  const key = usuario.id_usuario || usuario.id || usuario.name;
                  return (
                    <li
                      key={key}
                      className="border-b py-2 flex justify-between items-center"
                    >
                      <span>{usuario.nombre}</span>
                      <div className="flex gap-2">
                        <button
                          className="text-red-500 hover:underline"
                          type="button"
                          onClick={() =>
                            deleteUser(usuario.id_usuario || usuario.id)
                          }
                        >
                          Eliminar
                        </button>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          )}
          {!mostrarUsuarios &&
            usuarios.length === 0 &&
            category === "Usuarios" && (
              <div className="mt-4 w-full text-center text-gray-500 italic py-2">
                Actualmente no hay usuarios registrados en el sistema.
              </div>
            )}
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

          <form
            onSubmit={handleGenerarReporte}
            className={`mt-10 ${
              reportes === "Inventario" ? "block" : "hidden"
            }`}
          >
            <select
              className="border rounded-md w-full p-2 mt-2 cursor-pointer"
              {...registerReporte("reporte", { required: true })}
              defaultValue={""}
            >
              <option value="" disabled>
                Seleccione reporte a generar
              </option>
              <option value="Vehículos">Vehículos</option>
              <option value="Repuestos">Repuestos</option>
            </select>

            <button
              type="submit"
              className="mt-2 text-black border-2 hover:bg-orange-400 hover:text-white ease-in-out duration-300 px-8 py-2 rounded-md cursor-pointer text-center inline"
            >
              Generar Reporte
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Admin;
