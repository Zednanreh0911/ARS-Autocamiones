import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import {
  eliminarVehiculo,
  editarVehiculo,
  editarVehiculoNewImg,
} from "../api/axios";
import { useForm } from "react-hook-form";
import VehiculoDetallesModal from "./VehiculoDetallesModal";

AutoCard.propTypes = {
  image: PropTypes.string.isRequired,
  marca: PropTypes.string.isRequired,
  anno: PropTypes.number.isRequired,
  modelo: PropTypes.string.isRequired,
  tipo_combustible: PropTypes.string.isRequired,
  tipo_transmision: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onEliminar: PropTypes.func.isRequired,
  onActualizar: PropTypes.func.isRequired,
  tipo_vehiculo: PropTypes.string.isRequired,
  cantidad: PropTypes.number.isRequired,
};

function AutoCard({
  image,
  marca,
  anno,
  modelo,
  tipo_combustible,
  tipo_transmision,
  id,
  onEliminar,
  onActualizar,
  tipo_vehiculo,
  cantidad,
}) {
  const { userRole } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalEliminar, setModalModalEliminar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalDetalles, setModalDetalles] = useState(false);

  const {
    register: registerVehiculo,
    handleSubmit: handleSubmitVehiculo,
    setValue,
  } = useForm({
    defaultValues: {
      marca: "",
      anno: "",
      modelo: "",
      categoria: "",
      combustible: "",
      transmision: "",
      cantidad: "",
    },
  });

  useEffect(() => {
    setValue("marca", marca);
    setValue("anno", anno);
    setValue("modelo", modelo);
    setValue("categoria", tipo_vehiculo);
    setValue("combustible", tipo_combustible);
    setValue("transmision", tipo_transmision);
    setValue("cantidad", cantidad);
  }, [
    marca,
    anno,
    modelo,
    tipo_vehiculo,
    tipo_combustible,
    tipo_transmision,
    cantidad,
    setValue,
  ]);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const openModal = () => {
    setModalModalEliminar(true);
  };

  const closeModal = () => {
    setModalModalEliminar(false);
  };

  const openEditarModal = () => {
    setModalEditar(true);
  };

  const openDetallesModal = () => {
    setModalDetalles(true);
  };

  const closeDetallesModal = () => {
    setModalDetalles(false);
  };

  const submitEditar = handleSubmitVehiculo((data) => {
    if (!data.img || data.img.length === 0) {
      const formattedData = {
        marca: data.marca,
        anno: data.anno,
        modelo: data.modelo,
        tipo_vehiculo: data.categoria,
        tipo_combustible: data.combustible,
        tipo_transmision: data.transmision,
        img_url: image,
        cantidad: data.cantidad,
      };
      editarVehiculo(id, formattedData)
        .then((response) => {
          console.log("Vehículo editado:", response);
          onActualizar(id, { ...formattedData, año: data.anno });
        })
        .catch((error) => {
          console.error("Error al editar el vehículo:", error);
        });
    } else {
      const formData = new FormData();
      formData.append("imgvehiculo", data.img[0]);
      formData.append("marca", data.marca);
      formData.append("anno", data.anno);
      formData.append("modelo", data.modelo);
      formData.append("tipo_vehiculo", data.categoria);
      formData.append("tipo_combustible", data.combustible);
      formData.append("tipo_transmision", data.transmision);
      formData.append("cantidad", data.cantidad);
      editarVehiculoNewImg(id, formData)
        .then((response) => {
          console.log("Vehículo editado:", response);
          onActualizar(id, {
            marca: data.marca,
            año: data.anno,
            modelo: data.modelo,
            tipo_vehiculo: data.categoria,
            tipo_combustible: data.combustible,
            tipo_transmision: data.transmision,
            imagen_url: URL.createObjectURL(data.img[0]), // Actualiza la imagen
          });
        })
        .catch((error) => {
          console.error("Error al editar el vehículo:", error);
        });
    }
    setModalEditar(false);
  });

  const closeEditarModal = () => {
    setModalEditar(false);
  };

  const confirmDelete = (id) => {
    console.log("Vehículo eliminado", id);
    eliminarVehiculo(id)
      .then((response) => {
        console.log("Vehículo eliminado:", response);
        onEliminar(id);
      })
      .catch((error) => {
        console.error("Error al eliminar el vehículo:", error);
      });
    setModalModalEliminar(false);
  };

  return (
    <article className="max-w-96 md:max-w-80 xl:max-w-96 h-fit rounded-2xl overflow-hidden shadow-2xl mt-4 relative">
      {/* Solo admin y gerente pueden ver el menú de acciones */}
      {(userRole === "admin" || userRole === "gerente") && (
        <div className="absolute top-0 right-0">
          <div
            className="bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-bl-lg flex items-center justify-center cursor-pointer relative"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              viewBox="0 0 24 24"
              width="16px"
              fill="white"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15h-1v-6h2v6h-1zm0-8h-1V7h2v2h-1z" />
            </svg>
          </div>
          {menuVisible && (
            <div className="absolute top-full right-0 mt-2 bg-white text-black rounded-lg shadow-lg">
              <button
                className="block px-4 py-2 text-sm hover:bg-gray-100 hover:rounded-lg w-full text-left"
                onClick={openEditarModal}
              >
                Editar
              </button>
              {userRole === "gerente" && (
                <button
                  className="block px-4 py-2 text-sm hover:bg-gray-100 hover:rounded-lg w-full text-left"
                  onClick={openModal}
                >
                  Eliminar
                </button>
              )}
            </div>
          )}
        </div>
      )}
      <img
        className="w-full h-64 min-[400px]:min-w-96"
        src={image}
        alt={modelo}
      />
      <section className="text-left p-4">
        <header>
          <h2 className="text-orange-500 text-xs">{marca}</h2>
          <h3 className="font-medium mt-2">{modelo}</h3>
        </header>
        <dl className="grid grid-cols-3 text-sm mt-4 pb-8 border-b border-gray-300">
          <div className="flex justify-evenly">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#000000"
            >
              <path d="M160-120v-660q0-24 18-42t42-18h269q24 0 42 18t18 42v288h65q20.63 0 35.31 14.69Q664-462.63 664-442v219q0 21.68 15.5 36.34Q695-172 717-172t37.5-14.66Q770-201.32 770-223v-295q-11 6-23 9t-24 3q-39.48 0-66.74-27.26Q629-560.52 629-600q0-31.61 18-56.81Q665-682 695-690l-95-95 36-35 153 153q14 14 22.5 30.5T820-600v377q0 43.26-29.82 73.13-29.81 29.87-73 29.87Q674-120 644-149.87q-30-29.87-30-73.13v-219h-65v322H160Zm60-432h269v-228H220v228Zm503-4q18 0 31-13t13-31q0-18-13-31t-31-13q-18 0-31 13t-13 31q0 18 13 31t31 13ZM220-180h269v-312H220v312Zm269 0H220h269Z" />
            </svg>
            <div>
              <dt className="text-gray-400">Combustible</dt>
              <dd>{tipo_combustible}</dd>
            </div>
          </div>
          <div className="flex justify-evenly border-l border-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#000000"
            >
              <path d="M407-325q23 23 66.5 21.5T537-336l216-339-335 219q-30 20-32 64t21 67Zm71-474q57 0 119 18.5T716-717l-52 37q-45-30-96.5-44.5T477.98-739q-140.47 0-239.23 100.22Q140-538.57 140-396.02 140-351 152.5-305q12.5 46 35.5 85h579q22-36 35-84t13-94q0-42-12.5-90.5T758-578l39-52q38 56 57 112.5T875-404q2 60-12 113t-41 98q-12 23-25.5 28t-33.5 5H192q-17 0-33.5-8.5T134-193q-26-48-40-97.5T80-396q0-83 31.5-156.5t85.5-128Q251-735 323.68-767T478-799Zm-9 331Z" />
            </svg>
            <div>
              <dt className="text-gray-400">Año</dt>
              <dd>{anno}</dd>
            </div>
          </div>
          <div className="flex justify-evenly border-l border-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#000000"
            >
              <path d="M159.88-120Q114-120 82-152.08 50-184.17 50-230q0-38 22.5-67t57.5-39v-288q-35-10-57.5-39T50-730q0-45.83 32.12-77.92 32.12-32.08 78-32.08T238-807.92q32 32.09 32 77.92 0 38-22.5 67T190-624v114h260v-114q-35-10-57.5-39T370-730q0-45.83 32.12-77.92 32.12-32.08 78-32.08T558-807.92q32 32.09 32 77.92 0 38-22.5 67T510-624v114h210q21.25 0 35.63-15Q770-540 770-560v-64q-35-10-57.5-39T690-730q0-45.83 32.12-77.92 32.12-32.08 78-32.08T878-807.92q32 32.09 32 77.92 0 38-22.5 67T830-624v64q0 45-32.08 77.5Q765.83-450 720-450H510v114q35 10 57.5 39t22.5 67q0 45.83-32.12 77.92-32.12 32.08-78 32.08T402-152.08q-32-32.09-32-77.92 0-38 22.5-67t57.5-39v-114H190v114q35 10 57.5 39t22.5 67q0 45.83-32.12 77.92-32.12 32.08-78 32.08Zm.12-60q20 0 35-14.38 15-14.37 15-35.62 0-20-14.32-35-14.33-15-35.5-15-21.18 0-35.68 15T110-229.5q0 20.5 14.38 35Q138.75-180 160-180Zm0-500q20 0 35-14.32 15-14.33 15-35.5 0-21.18-14.32-35.68-14.33-14.5-35.5-14.5-21.18 0-35.68 14.37Q110-751.25 110-730q0 20 14.38 35 14.37 15 35.62 15Zm320 500q20 0 35-14.38 15-14.37 15-35.62 0-20-15-35t-35-15q-20 0-35 15t-15 35.5q0 20.5 15 35t35 14.5Zm0-500q20 0 35-14.32 15-14.33 15-35.5 0-21.18-15-35.68T480-780q-20 0-35 14.32-15 14.33-15 35.5 0 21.18 15 35.68t35 14.5Zm320.5 0q20.5 0 35-14.32 14.5-14.33 14.5-35.5 0-21.18-14.37-35.68Q821.25-780 800-780q-20 0-35 14.32-15 14.33-15 35.5 0 21.18 15 35.68t35.5 14.5ZM160-230Zm0-500Zm320 500Zm0-500Zm320 0Z" />
            </svg>
            <div>
              <dt className="text-gray-400">transmisión</dt>
              <dd>{tipo_transmision}</dd>
            </div>
          </div>
        </dl>
        <button
          className="mt-4 flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold shadow-lg transition-all duration-300 border-2 border-transparent hover:from-orange-500 hover:to-orange-600 hover:text-orange-500 hover:bg-white hover:border-orange-500 group"
          onClick={openDetallesModal}
        >
          <span className="mr-2 group-hover:text-orange-500 transition-colors duration-300">
            Ver detalles
          </span>
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white group-hover:bg-orange-500 transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="currentColor"
              className="group-hover:fill-white transition-colors duration-300"
            >
              <path d="m560-242-43-42 168-168H160v-60h525L516-681l43-42 241 241-240 240Z" />
            </svg>
          </span>
        </button>
      </section>

      {/* Modal de detalles del vehículo */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
          modalDetalles ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ pointerEvents: modalDetalles ? "auto" : "none" }}
      >
        <VehiculoDetallesModal
          open={modalDetalles}
          onClose={closeDetallesModal}
          vehiculo={{
            image,
            marca,
            anno,
            modelo,
            tipo_combustible,
            tipo_transmision,
            tipo_vehiculo,
            cantidad,
          }}
        />
      </div>

      {modalEditar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-4">Editar Vehículo</h2>
            <form
              onSubmit={submitEditar}
              className="mt-2 p-5 w-96 flex flex-col gap-4 items-center text-center shadow-md rounded-lg"
            >
              <select
                className="border rounded-md w-full p-2 mt-2 cursor-pointer"
                {...registerVehiculo("marca")}
                defaultValue={""}
              >
                <option value={marca} disabled>
                  {marca}
                </option>
                <option value="Encava">Encava</option>
                <option value="Isuzu">Isuzu</option>
              </select>
              <input
                className="border rounded-md w-full p-2"
                type="number"
                placeholder={anno}
                {...registerVehiculo("anno")}
              />
              <input
                className="border rounded-md w-full p-2"
                type="text"
                placeholder={modelo}
                {...registerVehiculo("modelo")}
              />
              <select
                className="border rounded-md w-full p-2 mt-2 cursor-pointer"
                {...registerVehiculo("categoria")}
                defaultValue={""}
              >
                <option value={tipo_vehiculo} disabled>
                  {tipo_vehiculo}
                </option>
                <option value="Buseta">Buseta</option>
                <option value="Camioneta">Camioneta</option>
              </select>
              <select
                className="border rounded-md w-full p-2 mt-2 cursor-pointer"
                {...registerVehiculo("combustible")}
                defaultValue={""}
              >
                <option value={tipo_combustible} disabled>
                  {tipo_combustible}
                </option>
                <option value="Diesel">Diesel</option>
                <option value="Gasolina">Gasolina</option>
                <option value="Hibrido">Hibrido</option>
              </select>
              <select
                className="border rounded-md w-full p-2 mt-2 cursor-pointer"
                {...registerVehiculo("transmision")}
                defaultValue={""}
              >
                <option value={tipo_transmision} disabled>
                  {tipo_transmision}
                </option>
                <option value="Manual">Manual</option>
                <option value="Automático">Automático</option>
              </select>
              <input
                className="border rounded-md w-full p-2"
                type="number"
                placeholder={cantidad}
                {...registerVehiculo("cantidad")}
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
                  {...registerVehiculo("img")}
                />
              </label>

              <button
                className="text-black border-2 hover:bg-orange-400 hover:text-white ease-in-out duration-300 px-8 py-2 rounded-md cursor-pointer"
                type="submit"
              >
                Publicar
              </button>
              <button
                className="text-black border-2 hover:bg-orange-400 hover:text-white ease-in-out duration-300 px-8 py-2 rounded-md cursor-pointer"
                onClick={closeEditarModal}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
      {modalEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-medium mb-4">
              ¿Está seguro que desea eliminar el vehículo seleccionado?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancelar
              </button>

              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={() => confirmDelete(id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default AutoCard;
