import { useState } from "react";
import SubtituloTipo1 from "../components/SubtituloTipo1";
import Footerbar from "../components/Footerbar";

function SobrePage() {
  const [selectedParrafo, setSelectedParrafo] = useState(0);
  const cambiarParrafo = (parrafo) => {
    setSelectedParrafo(parrafo);
  };
  return (
    <>
      <div className="container mx-auto">
        <span className="flex justify-start mt-48 m-4">
          <SubtituloTipo1 texto="¿Quienes somos?" />
        </span>
        <article className="mx-auto">
          <p className="text-justify m-2 font-bold text-xl">
            En ARS Autocamiones, la tradición de ENCAVA se une a la atención
            personalizada. Como concesionario oficial, te ofrecemos la gama
            completa de vehículos ENCAVA, desde autobuses hasta camionetas,
            siempre con la garantía de calidad y durabilidad que nos
            caracteriza. Además, nuestro equipo de profesionales te brindará un
            servicio integral para que disfrutes al máximo de tu inversión.
          </p>
          <img
            className="w-full rounded"
            src="https://s3-alpha-sig.figma.com/img/68ae/8d97/e0b12b7488abc7c87a58a78539e9bb14?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=uUU9wklhKmKKqji0fVhRnSE6lf0VdUSvvKUXlrxvzxwE7XfmVclU~joswrnMlHyHPj8TJLa~YqRTUGshqjQpyQF9Cxfgx0~25X~8i30kVNYFApmFxLtOx4B5EkmmzQCkD3qvw86456u72OmdsONQzfuejaDJzaPVUL8nxjlqlP~qKAIWNT~Ofu395rG7eKb484CPBthM7F7sKobO0O5EaUFqf63ANbGSViasSQUlHVdgDYkBNO~X~bshZ7tFgGQmZuAmcCnDO5Zkj9zQdYquyvExfj55JaibWZH2rtx4-7AJbItDzdXynAdDDHYrzoFUaufz2ME6EJRd1xnIGdZrVg__"
            alt="foto empresarial"
          />
        </article>

        <span className="flex justify-start mt-12 m-4">
          <SubtituloTipo1 texto="Nuestra Historia" />
        </span>
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:items-center md:gap-8 lg:grid-cols-2 lg:items-center lg:gap-8">
              <div>
                <div className="max-w-lg md:max-w-none">
                  <p className="mt-4 text-normal font-bold xl:text-xl text-justify">
                    ENCAVA, fundada en 1962, ha dejado una huella imborrable en
                    el sector del transporte venezolano durante más de seis
                    décadas. Su compromiso con la innovación y la satisfacción
                    de las necesidades de movilidad del país la ha convertido en
                    un referente en el mercado.<br></br> Desde sus inicios, los
                    autobuses de ENCAVA han sido pioneros en la evolución del
                    transporte público en Venezuela. La empresa se estableció
                    con el objetivo de ofrecer una combinación óptima de
                    calidad, diseño, innovación, servicio y comprensión de las
                    necesidades del paí.<br></br>ose en sus primeros logros y
                    con un enfoque constante en la excelencia en todas las áreas
                    de su negocio,<br></br>mprendió un camino de crecimiento
                    sostenido. Este camino no solo transformó a la empresa, sino
                    también a todo el parque vehicular dedicado al transporte
                    colectivo en el país, incluso antes de que ENCAVA cumpliera
                    su primera década. En su evolución, ENCAVA se trasladó a un
                    espacio diseñado para cumplir con sus objetivos: un terreno
                    de 110 mil metros cuadrados.<br></br>acio ha permitido las
                    inversiones necesarias en infraestructura, capital humano y
                    tecnología para consolidar su posición de liderazgo en el
                    sector. 
                  </p>
                </div>
              </div>

              <div>
                <img
                  src="https://s3-alpha-sig.figma.com/img/19bc/2b79/95a6b4809104be1cde029a2acbdae13c?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=l4NHjZVvohBIHHTN5nvXS4o1PRVJE8cGAKmchUyhCpWsKCVvJ1ffxO6LSp3pRx5XT8ByUCtw3nDmlWEOhmJzp-b4rd01HL89kgPGpv4GuKhzLx9Wdzp0-zwBVtLfOCj2LksqGmbYqHDBlggrzw9a5u3QKRuCta2OaCwZ5w0xpjSIZg~aemybGq2e2rQjpDFHtZ~F196QgOLzx7jgJAh1V~ccgyLnIrNJckR8Y1qdpXfrNpVWGOoPC-sXcXts3GlPYk5bGPYmHQ~LfWTbx~5~SCR4qepvDnzuZPIQtQ8540sU1WgTWlE5zs0F4UdAc3CXRriwbEw2jwe8a5h-Va9gsA__"
                  className="rounded sm:w-full md:w-full lg:w-full xl:full"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        <div className="flex justify-center mt-96">
          <button
            onClick={() => cambiarParrafo(0)}
            className="border hover:border-orange-700 border-black"
          >
            1
          </button>
          <button
            onClick={() => cambiarParrafo(1)}
            className="border  hover:border-orange-700 border-black"
          >
            2
          </button>
          <button
            onClick={() => cambiarParrafo(2)}
            className="border  hover:border-orange-700 border-black"
          >
            3
          </button>
        </div>
        <span>
          <p className={selectedParrafo === 0 ? "" : "hidden"}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Aspernatur, nisi vero quae ipsam repellendus exercitationem
            consequatur eum animi consectetur, nihil, dolorum incidunt. Ex
            officiis hic atque nostrum, reprehenderit quibusdam illum.
          </p>
          <p className={selectedParrafo === 1 ? "" : "hidden"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            sint illo illum dicta quasi dolor. Provident fugiat numquam tempora
            ipsam quaerat qui corrupti, sed non quis atque eaque asperiores
            eius.
          </p>
          <p className={selectedParrafo === 2 ? "" : "hidden"}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandae iste minus accusantium neque similique rerum dolore
            corporis magni, nobis voluptates ducimus ea eligendi odit laboriosam
            pariatur ipsam animi! Sint, nobis?
          </p>
        </span>
      </div>
      <Footerbar />
    </>
  );
}

export default SobrePage;
