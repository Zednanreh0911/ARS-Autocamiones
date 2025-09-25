import { useState, useEffect } from "react";

import { useAuth } from "../context/useAuth";
import { useForm } from "react-hook-form";
import { crearRepuesto, crearVehiculo, crearUsuario } from "../api/axios";
import { obtenerUsuarios, eliminarUsuario } from "../api/axios";
import { obtenerLogs } from "../api/axios";
import DialogoAfirmativo from "../components/DialogoAfirmativo";

function Admin() {
  const { userName, userRole } = useAuth();
  const [category, setCategory] = useState("");
  const [reportes, setReportes] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);
  const [auditLogs, setAuditLogs] = useState([]);
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    usuario: "",
    accion: "",
    fechaInicio: "",
    fechaFin: "",
  });
  // Estado para forzar la recarga manual de logs
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);
  // Estado para modal de detalles de log
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLog, setModalLog] = useState(null);

  // Función para mostrar detalles en modal
  const handleShowDetalles = (log) => {
    setModalLog(log);
    setModalOpen(true);
  };

  // Función para cerrar modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setModalLog(null);
  };

  // Formatear JSONB a string legible
  const formatJsonb = (jsonb) => {
    if (!jsonb) return "Sin datos";
    try {
      if (typeof jsonb === "string") {
        // Puede venir como string JSON
        return JSON.stringify(JSON.parse(jsonb), null, 2);
      }
      // Si ya es objeto
      return JSON.stringify(jsonb, null, 2);
    } catch {
      return String(jsonb);
    }
  };

  // Handler para cambios en los filtros
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Obtener logs cuando cambian los filtros
  useEffect(() => {
    if (userRole === "auditor") {
      setLoadingLogs(true);
      // Aquí iría la llamada al backend con los filtros
      // Ejemplo: obtenerLogsAuditoria(filters).then(setAuditLogs).finally(() => setLoadingLogs(false));
      obtenerLogs()
        .then((logs) => {
          setAuditLogs(logs);
          setLogs(logs); // Guardar logs sin filtrar para aplicar filtros manualmente
        })
        .catch((error) => {
          console.error("Error al obtener logs de auditoría:", error);
        })
        .finally(() => {
          setLoadingLogs(false);
        });
    }
  }, [userRole]);

  // Botón de aplicar filtros: fuerza la recarga de logs manualmente
  const handleApplyFilters = () => {
    let resultado = logs;
    console.log("filtro user: ", filters.usuario);
    if (filters.usuario && filters.usuario !== "") {
      // Buscar el usuario por nombre y obtener su id
      const usuarioObj = usuarios.find((u) => u.nombre === filters.usuario);
      const usuarioId = usuarioObj?.id_usuario;
      if (usuarioId) {
        resultado = resultado.filter((log) => log.usuario_id === usuarioId);
      } else {
        // Si no se encuentra el usuario, no mostrar ningún log
        resultado = [];
      }
    }
    if (filters.accion && filters.accion !== "") {
      resultado = resultado.filter((log) => log.accion === filters.accion);
    }
    if (filters.entidad && filters.entidad !== "") {
      console.log("filtro entidad: ", filters.entidad);
      resultado = resultado.filter(
        (log) => log.entidad_afectada === filters.entidad
      );
    }
    if (
      filters.fechaInicio &&
      filters.fechaFin &&
      filters.fechaInicio !== "" &&
      filters.fechaFin !== ""
    ) {
      resultado = resultado.filter((log) => {
        const fecha = new Date(log.fecha_hora);
        const inicio = new Date(filters.fechaInicio);
        const fin = new Date(filters.fechaFin);
        return fecha >= inicio && fecha <= fin;
      });
    }
    console.log("resultado: ", resultado);
    setAuditLogs(resultado);
  };
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

  const getNombreUsuario = (id) => {
    const usuario = usuarios.find((u) => u.id_usuario === id || u.id === id);
    return usuario ? usuario.nombre : id;
  };

  // Formatear fecha y hora a DD/MM/YYYY HH:mm:ss
  const formatFechaHora = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const pad = (n) => n.toString().padStart(2, "0");
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogError, setDialogError] = useState("");

  const manejoDeCategoria = (e) => {
    setCategory(e.target.innerText);
  };

  // Cargar usuarios al montar el componente (para auditoría y usuarios)
  useEffect(() => {
    setLoadingUsuarios(true);
    obtenerUsuarios()
      .then(setUsuarios)
      .finally(() => setLoadingUsuarios(false));
  }, []);

  // Cargar usuarios automáticamente al entrar a la sección Usuarios (mantener para refresco)
  useEffect(() => {
    if (category === "Usuarios") {
      setLoadingUsuarios(true);
      obtenerUsuarios()
        .then(setUsuarios)
        .finally(() => setLoadingUsuarios(false));
    }
  }, [category]);
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
      {userRole !== "auditor" && (
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
      )}
      {userRole !== "auditor" && (
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
          <DialogoAfirmativo
            isOpen={isDialogOpen}
            setIsOpen={handleDialogClose}
          >
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
              {...registerRepuesto("precioRepuesto", {
                required: true,
                min: 0,
              })}
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
          {/* Solo el gerente puede crear usuarios */}
          {userRole === "gerente" && (
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
                    usuarios
                      .filter((usuario) => usuario.rol !== "gerente")
                      .map((usuario) => {
                        const key =
                          usuario.id_usuario || usuario.id || usuario.name;
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
          )}
          {/* Si no es gerente, solo muestra la lista de usuarios si corresponde */}
          {userRole !== "gerente" && category === "Usuarios" && (
            <div className="mt-2 p-5 w-96 flex flex-col gap-4 items-center text-center shadow-md rounded-lg">
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
                    usuarios
                      .filter((usuario) => usuario.rol !== "gerente")
                      .map((usuario) => {
                        const key =
                          usuario.id_usuario || usuario.id || usuario.name;
                        return (
                          <li
                            key={key}
                            className="border-b py-2 flex justify-between items-center"
                          >
                            <span>{usuario.nombre}</span>
                          </li>
                        );
                      })
                  )}
                </ul>
              )}
              {!mostrarUsuarios && usuarios.length === 0 && (
                <div className="mt-4 w-full text-center text-gray-500 italic py-2">
                  Actualmente no hay usuarios registrados en el sistema.
                </div>
              )}
            </div>
          )}
          <div
            className={`mt-2 p-5 w-96 flex flex-col gap-4 items-center text-center shadow-md rounded-md ${
              category === "Reportes" ? "block" : "hidden"
            }`}
          >
            <button
              onClick={reporte}
              className={`text-black border-2 hover:bg-orange-400 hover:text-white ease-in-out duration-300 px-8 py-2 rounded-md cursor-pointer ${
                reportes === "Inventario"
                  ? "bg-orange-400 text-white"
                  : "bg-none"
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
      )}

      {userRole === "auditor" && (
        <section className="flex flex-col items-center w-full min-h-screen bg-gray-50 p-4">
          <h1 className="text-4xl font-bold text-center mb-6 text-orange-600 drop-shadow">
            Auditoría
          </h1>
          {/* Filtros */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4 w-full max-w-3xl mb-6 justify-center items-end">
            <div className="flex flex-wrap w-full gap-4">
              <div className="flex flex-col w-full sm:w-1/3 min-w-[180px] flex-1">
                <label className="text-sm font-semibold mb-1 text-gray-700">
                  Usuario
                </label>
                <select
                  name="usuario"
                  value={filters.usuario}
                  onChange={handleFilterChange}
                  className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="">Todos</option>
                  {usuarios
                    .filter((u) => u.rol !== "auditor")
                    .map((u) => (
                      <option key={u.id_usuario || u.id} value={u.nombre}>
                        {u.nombre}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col w-full sm:w-1/3 min-w-[180px] flex-1">
                <label className="text-sm font-semibold mb-1 text-gray-700">
                  Acción
                </label>
                <select
                  name="accion"
                  value={filters.accion}
                  onChange={handleFilterChange}
                  className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="">Todas</option>
                  <option value="crear_usuario">Crear usuario</option>
                  <option value="eliminar_usuario">Eliminar usuario</option>
                  <option value="crear_vehiculo">Crear vehículo</option>
                  <option value="editar_vehiculo">Editar vehículo</option>
                  <option value="eliminar_vehiculo">Eliminar vehículo</option>
                  <option value="crear_repuesto">Crear repuesto</option>
                  <option value="editar_repuesto">Editar repuesto</option>
                  <option value="eliminar_repuesto">Eliminar repuesto</option>
                </select>
              </div>
              <div className="flex flex-col w-full sm:w-1/3 min-w-[180px] flex-1">
                <label className="text-sm font-semibold mb-1 text-gray-700">
                  Entidad afectada
                </label>
                <select
                  name="entidad"
                  value={filters.entidad || ""}
                  onChange={handleFilterChange}
                  className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="">Todas</option>
                  <option value="vehiculos">Vehículos</option>
                  <option value="repuestos">Repuestos</option>
                  <option value="usuarios">Usuarios</option>
                </select>
              </div>
              <div className="flex flex-col w-full sm:w-1/3 min-w-[180px] flex-1">
                <label className="text-sm font-semibold mb-1 text-gray-700">
                  Desde
                </label>
                <input
                  type="date"
                  name="fechaInicio"
                  value={filters.fechaInicio}
                  onChange={handleFilterChange}
                  className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="flex flex-col w-full sm:w-1/3 min-w-[180px] flex-1">
                <label className="text-sm font-semibold mb-1 text-gray-700">
                  Hasta
                </label>
                <input
                  type="date"
                  name="fechaFin"
                  value={filters.fechaFin}
                  onChange={handleFilterChange}
                  className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="flex flex-col w-full sm:w-1/3 min-w-[180px] flex-1 justify-end">
                <button
                  type="button"
                  onClick={handleApplyFilters}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md shadow transition-colors duration-200 w-full"
                >
                  Aplicar filtros
                </button>
              </div>
            </div>
          </div>
          {/* Tabla de logs */}
          <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-x-auto p-4">
            {console.log("logs: ", auditLogs)}
            {loadingUsuarios || loadingLogs ? (
              <p className="text-center text-gray-500 py-8">Cargando logs...</p>
            ) : auditLogs.length === 0 ? (
              <p className="text-center text-gray-400 py-8">
                No hay registros de auditoría para los filtros seleccionados.
              </p>
            ) : (
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-orange-100 text-orange-700">
                    <th className="py-2 px-3 border-b font-semibold text-left">
                      Fecha
                    </th>
                    <th className="py-2 px-3 border-b font-semibold text-left">
                      Usuario
                    </th>
                    <th className="py-2 px-3 border-b font-semibold text-left">
                      Acción
                    </th>
                    <th className="py-2 px-3 border-b font-semibold text-left">
                      Entidad afectada
                    </th>
                    <th className="py-2 px-3 border-b font-semibold text-left">
                      Detalles
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log, idx) => (
                    <tr
                      key={log.id}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="py-2 px-3 border-b whitespace-nowrap">
                        {formatFechaHora(log.fecha_hora)}
                      </td>
                      <td className="py-2 px-3 border-b whitespace-nowrap">
                        {getNombreUsuario(log.usuario_id)}
                      </td>
                      <td className="py-2 px-3 border-b whitespace-nowrap">
                        {log.accion}
                      </td>
                      <td className="py-2 px-3 border-b whitespace-nowrap">
                        {log.entidad || log.entidad_afectada || "-"}
                      </td>
                      <td className="py-2 px-3 border-b max-w-xs break-words">
                        <button
                          className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-3 py-1 rounded shadow text-sm transition-colors duration-200"
                          onClick={() => handleShowDetalles(log)}
                        >
                          Mostrar detalles
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* Modal de detalles de log */}
                </tbody>
              </table>
            )}
            {modalOpen && modalLog && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative animate-fade-in">
                  <h2 className="text-2xl font-bold mb-4 text-orange-600">
                    Detalles del Reporte
                  </h2>
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-700 mb-1">
                      Datos nuevos:
                    </h3>
                    <pre className="bg-gray-100 rounded p-3 text-xs overflow-x-auto whitespace-pre-wrap max-h-48">
                      {formatJsonb(modalLog.detalle_nuevo)}
                    </pre>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-700 mb-1">
                      Datos anteriores:
                    </h3>
                    <pre className="bg-gray-100 rounded p-3 text-xs overflow-x-auto whitespace-pre-wrap max-h-48">
                      {formatJsonb(modalLog.detalle_anterior)}
                    </pre>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-2 right-2 text-gray-400 hover:text-orange-500 text-2xl font-bold focus:outline-none"
                    title="Cerrar"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Botón para mostrar PDF de los logs filtrados */}
          {auditLogs.length > 0 && (
            <div className="w-full max-w-5xl flex justify-center mt-4">
              <button
                type="button"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md shadow transition-colors duration-200"
                onClick={() => {
                  // Construir la URL con los filtros actuales
                  const params = new URLSearchParams({
                    usuario: filters.usuario || "",
                    accion: filters.accion || "",
                    entidad: filters.entidad || "",
                    fechaInicio: filters.fechaInicio || "",
                    fechaFin: filters.fechaFin || "",
                  });
                  window.open(
                    `/api/auditoria/pdf?${params.toString()}`,
                    "_blank"
                  );
                }}
              >
                Ver PDF de estos datos
              </button>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default Admin;
