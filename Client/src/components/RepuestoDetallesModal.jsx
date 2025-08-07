import PropTypes from "prop-types";

function RepuestoDetallesModal({ open, onClose, repuesto }) {
  if (!open) return null;

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
          src={repuesto.image}
          alt={repuesto.nombre}
          className="w-full max-h-80 object-contain rounded mb-4"
        />
        <h2 className="text-orange-500 text-lg font-bold mb-2">{repuesto.marca}</h2>
        <h3 className="font-medium mb-2">{repuesto.nombre}</h3>
        <ul className="text-sm mb-2">
          <li><span className="font-semibold">Precio unitario:</span> $ {repuesto.precio_unitario}</li>
          <li><span className="font-semibold">Cantidad:</span> {repuesto.cantidad}</li>
          <li><span className="font-semibold">Categoría:</span> {repuesto.categoria}</li>
        </ul>
      </div>
    </div>
  );
}

RepuestoDetallesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  repuesto: PropTypes.shape({
    image: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    marca: PropTypes.string.isRequired,
    precio_unitario: PropTypes.number.isRequired,
    cantidad: PropTypes.number.isRequired,
    categoria: PropTypes.string.isRequired,
  }).isRequired,
};

export default RepuestoDetallesModal;
