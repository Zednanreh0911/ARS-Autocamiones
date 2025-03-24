import { useState, useEffect } from "react";
import RepuestoCard from "../components/RepuestoCard";
import ColapsedButton from "../components/ColapsedButton";
import { obtenerRepuestos } from "../api/axios";

function RepuestosPage() {
  const [repuestos, setRepuestos] = useState([]);
  useEffect(() => {
    obtenerRepuestos().then((repuestos) => setRepuestos(repuestos));
  }, []);
  const [selectedCategory, setSelectedCategory] = useState("repuestos");
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <main className="mt-40 max-w-[1600px]  mx-auto flex">
      <aside className="hidden min-[720px]:block sticky top-40 min-w-64 p-4 h-fit overflow-y-auto">
        <h2 className=" text-black font-bold text-2xl border-b-2  border-orange-500">
          Categorias
        </h2>
        <ColapsedButton
          title="Repuestos"
          categories={["Internos", "Externos"]}
          onCategorySelect={setSelectedCategory}
        />
      </aside>
      <div
        onClick={handleDropdown}
        className={`position fixed top-0 w-full h-screen z-[1] ${
          openDropdown ? "block" : "hidden"
        }`}
      ></div>
      <section className="px-10 w-full">
        <div className="relative flex flex-wrap justify-center gap-10 items-end pt-16">
          {/* dropdown */}
          <button
            onClick={handleDropdown}
            className="min-[720px]:hidden rounded-lg absolute top-0 left-2 bg-orange-500 text-white p-4 z-[3]"
          >
            {selectedCategory.toUpperCase()}
          </button>
          <span
            className={`shadow-xl rounded-md max-h-52 bg-orange-200 bg-opacity-75 min-[720px]:hidden text-5xl font-bold p-2 absolute top-10 left-4 overflow-y-scroll transition-all duration-300 ease-out  ${
              openDropdown ? "opacity-100 z-[2]" : "opacity-0 z-[-1]"
            }`}
          >
            <ColapsedButton
              title="Repuestos"
              categories={["Internos", "Externos"]}
              onCategorySelect={setSelectedCategory}
            />
          </span>
          <h2 className="hidden min-[720px]:block text-5xl font-bold absolute top-0 left-4">
            {selectedCategory.toUpperCase()}
          </h2>
          {repuestos &&
            repuestos
              .filter((repuesto) => repuesto.category === selectedCategory)
              .map((repuesto, index) => (
                <RepuestoCard
                  key={index}
                  image={repuesto.img}
                  name={repuesto.name}
                  marca={repuesto.marca}
                  precio={repuesto.precio}
                />
              ))}
        </div>
      </section>
    </main>
  );
}

export default RepuestosPage;
