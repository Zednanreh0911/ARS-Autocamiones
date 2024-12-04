import Carousel from "../components/Carousel";
import BeneficioCard from "../components/BeneficioCard";
import AutoCard from "../components/AutoCard";
import BotonTipo1 from "../components/BotonTipo1";
import auto1 from "../assets/auto1.jpg";
import auto2 from "../assets/auto2.jpg";
import auto3 from "../assets/auto3.jpg";

function HomePage() {
  return (
    <main className="h-[200vh] mt-36">
      <Carousel images={[auto1, auto2, auto3]} />
      <section className="container mx-auto text-center mt-16">
        <h1 className="text-4xl font-bold">
          COMPRA TU VEHICULO EN{" "}
          <span className="text-orange-500">ARS AUTOCAMIONES</span>
        </h1>
        {/* Hacer que la cantidad de BeneficioCard y grid-cols coincidan OJO */}
        <div className="grid grid-cols-4 justify-items-center mt-8">
          <BeneficioCard />
          <BeneficioCard />
          <BeneficioCard />
          <BeneficioCard />
        </div>
      </section>
      <section className="container mx-auto text-center mt-32">
        <h2 className="text-3xl font-bold">
          Echa un vistazo a nuestros vehiculos disponibles
        </h2>
        <div className="grid grid-cols-3 mt-8 justify-items-center">
          <AutoCard image={auto1} />
          <AutoCard image={auto2} />
          <AutoCard image={auto3} />
        </div>
        <BotonTipo1 texto="Ver más" />
      </section>
    </main>
  );
}

export default HomePage;
