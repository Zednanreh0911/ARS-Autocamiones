import PropTypes from "prop-types";

DialogoAfirmativo.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

function DialogoAfirmativo({ isOpen, setIsOpen, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <dialog className="bg-white w-64 h-32 rounded-lg shadow-lg flex flex-col items-center justify-center p-4">
        <p className="text-center text-lg font-medium text-gray-700">
          {children}
        </p>
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={() => setIsOpen(false)}
        >
          Aceptar
        </button>
      </dialog>
    </div>
  );
}

export default DialogoAfirmativo;
