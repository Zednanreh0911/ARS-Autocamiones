function BeneficioCard() {
  return (
    <div className="flex items-baseline w-fit h-fit py-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="64px"
        viewBox="0 -960 960 960"
        width="64px"
        fill="#000000"
      >
        <path d="M132-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h696q24 0 42 18t18 42v600q0 24-18 42t-42 18H132Zm0-60h696v-600H132v600Zm68-100h200v-80H200v80Zm382-80 198-198-57-57-141 142-57-57-56 57 113 113Zm-382-80h200v-80H200v80Zm0-160h200v-80H200v80Zm-68 420v-600 600Z" />
      </svg>
      <p className="max-w-40 md:max-w-44">
        Beneficios que ofrecen en el concesionario como lavado de autos
      </p>
    </div>
  );
}

export default BeneficioCard;
