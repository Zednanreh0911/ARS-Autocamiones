import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  eliminarRepuesto,
  editarRepuesto,
  editarRepuestoNewImg,
} from "../api/axios";

RepuestoCard.propTypes = {
  image: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  marca: PropTypes.string.isRequired,
  precio_unitario: PropTypes.number.isRequired,
  id_repuesto: PropTypes.number.isRequired,
  cantidad: PropTypes.number.isRequired,
  categoria: PropTypes.string.isRequired,
  onEliminar: PropTypes.func.isRequired,
  onActualizar: PropTypes.func.isRequired,
};

function RepuestoCard({
  image,
  nombre,
  marca,
  precio_unitario,
  id_repuesto,
  cantidad,
  categoria,
  onEliminar,
  onActualizar,
}) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalEliminar, setModalModalEliminar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);

  const {
    register: registerRepuesto,
    handleSubmit: handleSubmitRepuesto,
    setValue,
  } = useForm({
    defaultValues: {
      marca: "",
      nombre: "",
      precio_unitario: "",
      cantidad: "",
      categoria: "",
    },
  });

  useEffect(() => {
    setValue("marca", marca);
    setValue("nombre", nombre);
    setValue("precio_unitario", precio_unitario);
    setValue("cantidad", cantidad);
    setValue("categoria", categoria);
  }, [marca, nombre, precio_unitario, cantidad, categoria, setValue]);

  const subirRepuesto = handleSubmitRepuesto((data) => {
    console.log("Datos del repuesto:", data);
    if (!data.img || data.img.length === 0) {
      const formattedData = {
        ...data,
        imagen_url: image,
      };
      editarRepuesto(id_repuesto, formattedData)
        .then((response) => {
          console.log("Repuesto editado:", response);
          onActualizar(id_repuesto, formattedData);
        })
        .catch((error) => {
          console.error("Error al editar el repuesto:", error);
        });
    } else {
      const formData = new FormData();
      formData.append("imgRepuesto", data.img[0]);
      formData.append("marca", data.marca);
      formData.append("nombre", data.nombre);
      formData.append("precio_unitario", data.precio_unitario);
      formData.append("cantidad", data.cantidad);
      formData.append("categoria", data.categoria);

      editarRepuestoNewImg(id_repuesto, formData)
        .then((response) => {
          console.log("Repuesto editado:", response);
          onActualizar(id_repuesto, {
            ...data,
            imagen_url: response.body.repuesto.imagen_url,
          });
        })
        .catch((error) => {
          console.error("Error al editar el repuesto:", error);
        });
    }
    setModalEditar(false);
  });

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

  const confirmDelete = (id) => {
    console.log("Repuesto eliminado", id);
    eliminarRepuesto(id)
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
    <article className="w-72 md:w-80 xl:w-96 h-full rounded-2xl overflow-hidden shadow-2xl mt-4 relative">
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
            <button
              className="block px-4 py-2 text-sm hover:bg-gray-100 hover:rounded-lg w-full text-left"
              onClick={openModal}
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
      <img className="w-full max-h-64 min-h-64" src={image} alt={nombre} />
      <section className="text-left p-4">
        <header className="border-b border-gray-300 pb-4">
          <h2 className="text-orange-500 text-sm">{marca}</h2>
          <h3 className="font-medium text-xl mt-2 text-center">{nombre}</h3>
          <p className="text-orange-500 text-base font-medium mt-2">
            $ {precio_unitario}
          </p>
        </header>

        <button className="border rounded-xl border-transparent hover:border-orange-500 ease-in-out duration-300 mt-4 flex items-center gap-2 p-3">
          Ver detalles{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#f97316"
          >
            <path d="m560-242-43-42 168-168H160v-60h525L516-681l43-42 241 241-240 240Z" />
          </svg>
        </button>
      </section>
      {modalEditar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-4">Editar Repuesto</h2>
            <form
              onSubmit={subirRepuesto}
              className="mt-2 p-5 w-96 flex flex-col gap-4 items-center text-center shadow-md rounded-lg"
            >
              <input
                className="border rounded-md w-full p-2"
                type="text"
                placeholder={marca}
                {...registerRepuesto("marca")}
              />
              <input
                className="border rounded-md w-full p-2"
                type="text"
                placeholder={nombre}
                {...registerRepuesto("nombre")}
              />
              <input
                className="border rounded-md w-full p-2"
                type="number"
                placeholder={precio_unitario}
                min="0" // No permite valores menores a 0
                step="0.01"
                {...registerRepuesto("precio_unitario")}
              />
              <input
                className="border rounded-md w-full p-2"
                type="number"
                placeholder={cantidad}
                min="0" // No permite valores menores a 0
                {...registerRepuesto("cantidad", {
                  min: 0,
                })}
              />
              <select
                className="border rounded-md w-full p-2 mt-2 cursor-pointer"
                {...registerRepuesto("categoria")}
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
                  {...registerRepuesto("img")}
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
                onClick={() => setModalEditar(false)}
                type="button"
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
                onClick={() => confirmDelete(id_repuesto)}
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

export default RepuestoCard;
