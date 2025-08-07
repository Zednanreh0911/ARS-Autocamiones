import PropTypes from "prop-types";

function VehiculoDetallesModal({ open, onClose, vehiculo }) {
  if (!open) return null;

  // Cierra el modal si se hace clic fuera del contenido
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md sm:max-w-lg p-6 relative mx-2">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-orange-500 text-2xl font-bold"
          onClick={onClose}
          aria-label="Cerrar"
        >
          &times;
        </button>
        <img
          src={vehiculo.image}
          alt={vehiculo.modelo}
          className="w-full max-h-80 object-contain rounded mb-4"
        />
        <h2 className="text-orange-500 text-lg font-bold mb-2">
          {vehiculo.marca}
        </h2>
        <h3 className="font-medium mb-2">{vehiculo.modelo}</h3>
        <ul className="text-sm mb-2">
          <li>
            <span className="font-semibold">Año:</span> {vehiculo.anno}
          </li>
          <li>
            <span className="font-semibold">Tipo de vehículo:</span>{" "}
            {vehiculo.tipo_vehiculo}
          </li>
          <li>
            <span className="font-semibold">Combustible:</span>{" "}
            {vehiculo.tipo_combustible}
          </li>
          <li>
            <span className="font-semibold">Transmisión:</span>{" "}
            {vehiculo.tipo_transmision}
          </li>
          <li>
            <span className="font-semibold">Cantidad:</span> {vehiculo.cantidad}
          </li>
        </ul>
      </div>
    </div>
  );
}

VehiculoDetallesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  vehiculo: PropTypes.shape({
    image: PropTypes.string.isRequired,
    marca: PropTypes.string.isRequired,
    anno: PropTypes.number.isRequired,
    modelo: PropTypes.string.isRequired,
    tipo_combustible: PropTypes.string.isRequired,
    tipo_transmision: PropTypes.string.isRequired,
    tipo_vehiculo: PropTypes.string.isRequired,
    cantidad: PropTypes.number.isRequired,
  }).isRequired,
};

export default VehiculoDetallesModal;
