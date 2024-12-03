import Carousel from "../components/Carousel";
import BeneficioCard from "../components/BeneficioCard";
import auto1 from "../assets/auto1.jpg";
import auto2 from "../assets/auto2.jpg";
import auto3 from "../assets/auto3.jpg";

function HomePage() {
  return (
    <main className="h-[200vh] mt-36">
      <Carousel images={[auto1, auto2, auto3]} />
      <section className="container mx-auto text-center mt-8">
        <h1 className="text-4xl font-bold">
          COMPRA TU VEHICULO EN{" "}
          <span className="text-orange-500">ARS AUTOCAMIONES</span>
        </h1>
        {/* Hacer que la cantidad de BeneficioCard y grid-cols coincidan OJO */}
        <div className="grid grid-cols-4 gap-20 mt-8">
          <BeneficioCard />
          <BeneficioCard />
          <BeneficioCard />
          <BeneficioCard />
        </div>
      </section>
      <section className="container mx-auto text-center mt-16">
        <h2 className="text-2xl font-bold">
          Echa un vistazo a nuestros vehiculos disponibles
        </h2>
        <div className="max-w-96 h-fit rounded-md border border-black overflow-hidden">
          <img className="w-full" src={auto1} alt="auto1" />
          <div className="text-left p-4">
            <p className="text-red-600 text-xs">Mini Cooper 3 similar</p>
            <p className="font-medium mt-2">Chevrolet Suburban 2021 mo</p>
            <p className="text-red-600 text-sm font-medium mt-2">$27,000</p>
            <div className="grid grid-cols-3 text-sm mt-4 pb-4">
              <div>
                <p className="text-gray-400">Combustible</p>
                <p>diesel</p>
              </div>
              <div>
                <p className="text-gray-400">Km</p>
                <p>Nuevo</p>
              </div>
              <div>
                <p className="text-gray-400">transmision</p>
                <p>automatico</p>
              </div>
            </div>
            <button className="mt-4">{"Ver detalles ->"}</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
