import PropTypes from "prop-types";

SubtituloTipo1.propTypes = {
  texto: PropTypes.string.isRequired,
};
function SubtituloTipo1({ texto }) {
  return <h2 className="text-3xl font-bold">{texto}</h2>;
}

export default SubtituloTipo1;
