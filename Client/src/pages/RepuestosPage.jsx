import { useState } from "react";
import img1 from "../assets/auto3.jpg";
import AutoCard from "../components/AutoCard";
import ColapsedButton from "../components/ColapsedButton";

function RepuestosPage() {
  const [selectedCategory, setSelectedCategory] = useState("repuestos");

  return (
    <main className="mt-40 flex">
      <aside className="min-w-64 p-4 h-full">
        <h2 className="text-black font-bold text-2xl border-b-2  border-orange-500">
          Categorias
        </h2>
        <ColapsedButton
          title="vehiculos"
          categories={["internos", "externos"]}
          onCategorySelect={setSelectedCategory}
        />
      </aside>
      <section className="px-10 w-full">
        <div className="flex flex-wrap justify-center gap-10 items-end">
          <div className="flex flex-col">
            <h2 className="text-5xl font-bold">
              {selectedCategory.toUpperCase()}
            </h2>
            <AutoCard image={img1} />
          </div>
          <AutoCard image={img1} />
          <AutoCard image={img1} />
          <AutoCard image={img1} />
          <AutoCard image={img1} />
          <AutoCard image={img1} />
        </div>
      </section>
    </main>
  );
}

export default RepuestosPage;
