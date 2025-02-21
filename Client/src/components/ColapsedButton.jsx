import { useState } from "react";
import PropTypes from "prop-types";

ColapsedButton.propTypes = {
  title: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCategorySelect: PropTypes.func.isRequired,
};

function ColapsedButton({ title, categories, onCategorySelect }) {
  const arrowDown = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#000"
    >
      <path d="M480-360 280-560h400L480-360Z" />
    </svg>
  );
  const arrowUp = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#000"
    >
      <path d="M480-560 280-360h400L480-560Z" />
    </svg>
  );
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (e) => {
    onCategorySelect(e.target.innerText);
  };

  return (
    <div>
      <button
        onClick={toggleOpen}
        className="text-black font-bold text-2xl mt-4 border-b-2 border-transparent flex items-center hover:border-orange-500 duration-300 ease-in-out"
      >
        {title} {isOpen ? arrowUp : arrowDown}
      </button>
      <ul
        className={`ml-4 mt-2 transition-all ease-in-out duration-500 ${
          isOpen ? "opacity-100 max-h-40" : "opacity-0 max-h-0"
        } overflow-hidden`}
      >
        {categories.map((category, index) => (
          <li
            onClick={handleCategoryClick}
            key={index}
            className="text-black font-bold text-2xl max-w-fit cursor-pointer hover:text-orange-500 ease-in-out duration-300"
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ColapsedButton;
