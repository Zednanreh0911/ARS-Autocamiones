import { useState } from "react";
import RepuestoCard from "../components/RepuestoCard";
import ColapsedButton from "../components/ColapsedButton";

import gearImage from "../assets/worm-gear.jpeg";

function RepuestosPage() {
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
          title="vehiculos"
          categories={["internos", "externos"]}
          onCategorySelect={setSelectedCategory}
        />
        <ColapsedButton
          title="repuestos"
          categories={["internos", "loooong category", "externos"]}
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
              title="repuestos"
              categories={["internos", "loooong category", "externos"]}
              onCategorySelect={setSelectedCategory}
            />
            <ColapsedButton
              title="repuestos"
              categories={["internos", "loooong category", "externos"]}
              onCategorySelect={setSelectedCategory}
            />
            <ColapsedButton
              title="repuestos"
              categories={["internos", "loooong category", "externos"]}
              onCategorySelect={setSelectedCategory}
            />
          </span>
          <h2 className="hidden min-[720px]:block text-5xl font-bold absolute top-0 left-4">
            {selectedCategory.toUpperCase()}
          </h2>
          <RepuestoCard
            image={gearImage}
            title="motor"
            category="encava"
            price="120$"
          />
          <RepuestoCard
            image={gearImage}
            title="motor"
            category="encava"
            price="120$"
          />
          <RepuestoCard
            image={gearImage}
            title="motor"
            category="encava"
            price="120$"
          />
          <RepuestoCard
            image={gearImage}
            title="motor"
            category="encava"
            price="120$"
          />
          <RepuestoCard
            image={gearImage}
            title="motor"
            category="encava"
            price="120$"
          />
          <RepuestoCard
            image={gearImage}
            title="motor"
            category="encava"
            price="120$"
          />
        </div>
      </section>
    </main>
  );
}

export default RepuestosPage;
