import { Link, NavLink } from "react-router-dom";
import FacebookIcon from "../assets/facebook.svg";
import InstagramIcon from "../assets/instagram.svg";
import "../sas.css";

function Navbar() {
  return (
    <header>
      <div className="flex justify-between bg-orange-500 py-1 px-4 text-black">
        <Link to={"/"}>correodeejemplo@gmail.com</Link>

        <ul className="flex gap-2">
          <li>
            <Link to="https://www.facebook.com/" target="_blank">
              <img className="w-6 h-6" src={FacebookIcon} alt="Mi imagen SVG" />
            </Link>
          </li>
          <li>
            <Link to="https://www.instagram.com/" target="_blank">
              <img
                className="w-6 h-6"
                src={InstagramIcon}
                alt="Mi imagen SVG"
              />
            </Link>
          </li>
        </ul>
      </div>
      <nav className="flex justify-between py-8 px-6 text-black border-b-2 border-stone-400">
        <h1 className="font-bold text-3xl">
          <Link to="/">Encava</Link>
        </h1>
        <ul className="flex gap-8 text-">
          <li className="flex items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "resaltar" : "boton_navegacion"
              }
            >
              Inicio
            </NavLink>
          </li>
          <li className="flex items-center">
            <NavLink
              to="/vehiculos"
              className={({ isActive }) =>
                isActive ? "resaltar" : "boton_navegacion"
              }
            >
              Vehiculos
            </NavLink>
          </li>
          <li className="flex items-center">
            <NavLink
              to="/repuestos"
              className={({ isActive }) =>
                isActive ? "resaltar" : "boton_navegacion"
              }
            >
              Repuestos
            </NavLink>
          </li>
          <li className="flex items-center">
            <NavLink
              to="/sobre_nosotros"
              className={({ isActive }) =>
                isActive ? "resaltar" : "boton_navegacion"
              }
            >
              Sobre Nosotros
            </NavLink>
          </li>
          <li className="flex items-center">
            <NavLink
              to="/contactanos"
              className={({ isActive }) =>
                isActive ? "resaltar" : "boton_navegacion"
              }
            >
              Contactanos
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
