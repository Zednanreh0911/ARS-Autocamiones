import PropTypes from "prop-types";

BotonTipo1.propTypes = {
  texto: PropTypes.string.isRequired,
  paddingY: PropTypes.string.isRequired,
  paddingX: PropTypes.string.isRequired,
};

function BotonTipo1({ texto, paddingY, paddingX }) {
  // py-4 px-24
  // paddingY = "1.3rem"
  // paddingX = "6rem"
  return (
    <button
      onClick={() => alert("hi")}
      style={{
        "--before-content": `"${texto}"`,
        padding: `${paddingY} ${paddingX}`,
      }}
      className={`relative border-[3px] border-black rounded-full font-bold mt-12 text-2xl bg-orange-500 before:content-[var(--before-content)] before:absolute before:w-[102%] before:h-[110%] before:top-[-25%] before:left-[-1%] before:bg-white before:flex before:items-center before:justify-center before:border-[3px] before:border-black before:rounded-full before:transition-all before:duration-300 before:ease hover:before:top-[-8%]`}
    >
      {texto}
    </button>
  );
}

export default BotonTipo1;
