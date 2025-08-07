import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuth";
import LogoutIcon from "./LogoutIcon";
import logoArs from "../assets/logoArs.png";

function Navbar() {
  const [menu, setMenu] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <header className="fixed top-0 w-full z-10">
      <div className="flex justify-between bg-orange-500 py-1 px-4 text-black">
        <Link to={"/"}>correodeejemplo@gmail.com</Link>

        <ul className="flex gap-2">
          <li>
            <Link to="https://www.facebook.com/" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                alt="Icono de Facebook"
                viewBox="0 0 320 512"
              >
                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
              </svg>
            </Link>
          </li>
          <li>
            <Link to="https://www.instagram.com/" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 448 512"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
      <nav className="flex py-7 px-6 text-black bg-white rounded-b-3xl shadow-lg justify-between">
        <span className="font-bold text-3xl">
          <Link to="/">
            <img className="h-12" src={logoArs} alt="ARS" />
          </Link>
        </span>
        <ul className="hidden min-[720px]:flex min-[720px]:gap-8 ml-auto">
          <li className="flex items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "relative z-10 before:content-[''] before:absolute before:w-[120%] before:h-[15%] before:left-[-11%] before:bottom-[-10%] before:bg-orange-500 before:-z-10"
                  : "relative before:content-[''] before:absolute before:w-[120%] before:h-[15%] before:left-[-100%] before:bottom-[-10%] before:bg-transparent before:-z-10 hover:before:left-[-11%] hover:before:transition-all hover:before:duration-300 hover:before:bg-orange-500 hover:before:z-10"
              }
            >
              Inicio
            </NavLink>
          </li>
          <li className="flex items-center">
            <NavLink
              to="/vehiculos"
              className={({ isActive }) =>
                isActive
                  ? "relative z-10 before:content-[''] before:absolute before:w-[120%] before:h-[15%] before:left-[-11%] before:bottom-[-10%] before:bg-orange-500 before:-z-10"
                  : "relative before:content-[''] before:absolute before:w-[120%] before:h-[15%] before:left-[-100%] before:bottom-[-10%] before:bg-transparent before:-z-10 hover:before:left-[-11%] hover:before:transition-all hover:before:duration-300 hover:before:bg-orange-500 hover:before:z-10"
              }
            >
              Vehiculos
            </NavLink>
          </li>
          <li className="flex items-center">
            <NavLink
              to="/repuestos"
              className={({ isActive }) =>
                isActive
                  ? "relative z-10 before:content-[''] before:absolute before:w-[120%] before:h-[15%] before:left-[-11%] before:bottom-[-10%] before:bg-orange-500 before:-z-10"
                  : "relative before:content-[''] before:absolute before:w-[120%] before:h-[15%] before:left-[-100%] before:bottom-[-10%] before:bg-transparent before:-z-10 hover:before:left-[-11%] hover:before:transition-all hover:before:duration-300 hover:before:bg-orange-500 hover:before:z-10"
              }
            >
              Repuestos
            </NavLink>
          </li>
          <li className="flex items-center">
            <NavLink
              to="/sobre_nosotros"
              className={({ isActive }) =>
                isActive
                  ? "relative z-10 before:content-[''] before:absolute before:w-[120%] before:h-[15%] before:left-[-11%] before:bottom-[-10%] before:bg-orange-500 before:-z-10"
                  : "relative before:content-[''] before:absolute before:w-[120%] before:h-[15%] before:left-[-100%] before:bottom-[-10%] before:bg-transparent before:-z-10 hover:before:left-[-11%] hover:before:transition-all hover:before:duration-300 hover:before:bg-orange-500 hover:before:z-10"
              }
            >
              Sobre Nosotros
            </NavLink>
          </li>
          <li className="flex items-center">
            <a
              href="#footerbar"
              className="relative before:content-[''] before:absolute before:w-[120%] before:h-[15%] before:left-[-100%] before:bottom-[-10%] before:bg-transparent before:-z-10 hover:before:left-[-11%] hover:before:transition-all hover:before:duration-300 hover:before:bg-orange-500 hover:before:z-10"
            >
              Contactanos
            </a>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <button
              onClick={logout}
              title="Cerrar sesión"
              className="group ml-5 p-1 rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
              style={{ transitionProperty: 'color, background, border, box-shadow, transform' }}
            >
              <span className="block">
                <LogoutIcon className="w-8 h-8 group-hover:scale-110 group-hover:text-orange-500 group-active:scale-95 transition-all duration-300" />
              </span>
            </button>
          )}
          <button
            onClick={handleMenu}
            className="relative block z-20 min-[720px]:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-10 h-10  transition-all ease duration-300 ${
                menu ? "rotate-90 opacity-0" : "opacity-100"
              }`}
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-10 h-10 absolute top-0 left-0 transition-all ease duration-300 ${
                menu ? "opacity-100" : "rotate-90 opacity-0"
              }`}
              viewBox="0 -960 960 960"
              fill="#000000"
            >
              <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
            </svg>
          </button>
        </div>

        <div
          onClick={handleMenu}
          className={`absolute z-10 top-full left-0 w-screen h-screen bg-black bg-opacity-60 ${
            menu ? "block" : "hidden"
          }`}
        ></div>
        <div
          className={`absolute z-20 top-full right-0 h-screen bg-white p-10 border shadow-2xl transition-all ease duration-300 ${
            menu ? "translate-x-[0%]" : "translate-x-[150%]"
          }`}
        >
          <ul className="text-center text-2xl">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  (isActive ? "text-orange-500" : "") +
                  " py-1 px-14 transition-all duration-300 hover:text-orange-500"
                }
              >
                Inicio
              </NavLink>
            </li>
            <li className="mt-5">
              <NavLink
                to="/vehiculos"
                className={({ isActive }) =>
                  (isActive ? "text-orange-500" : "") +
                  " py-1 px-10 transition-all duration-300 hover:text-orange-500"
                }
              >
                Vehiculos
              </NavLink>
            </li>
            <li className="mt-5">
              <NavLink
                to="/repuestos"
                className={({ isActive }) =>
                  (isActive ? "text-orange-500" : "") +
                  " py-1 px-10 transition-all duration-300 hover:text-orange-500"
                }
              >
                Repuestos
              </NavLink>
            </li>
            <li className="mt-5">
              <NavLink
                to="/sobre_nosotros"
                className={({ isActive }) =>
                  (isActive ? "text-orange-500" : "") +
                  " py-1 px-4 transition-all duration-300 hover:text-orange-500"
                }
              >
                Sobre Nosotros
              </NavLink>
            </li>
            <li className="mt-5">
              <a
                href="#footerbar"
                className="py-1 px-8 transition-all duration-300 hover:text-orange-500"
              >
                Contactanos
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
