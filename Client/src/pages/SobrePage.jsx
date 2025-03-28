import ars from "../assets/ARS-Auto-Camiones.png";
import historia from "../assets/encav.png";
import mision from "../assets/image 4.png";
import vision from "../assets/vision.png";
import futuro from "../assets/futuro.png";
function SobrePage() {
  return (
    <>
      <div className="container mx-auto">
        <h2 className="m-2 mt-40 font-bold text-3xl">¿Quienes somos?</h2>
        <article className="mx-auto">
          <p className="text-justify m-2 text-normal font-bold sm:text-xl">
            En <span className="text-orange-500">ARS Autocamiones</span>, la
            tradición de ENCAVA se une a la atención personalizada. Como
            concesionario oficial, te ofrecemos la gama completa de vehículos
            ENCAVA, desde autobuses hasta camionetas, siempre con la garantía de
            calidad y durabilidad que nos caracteriza. Además, nuestro equipo de
            profesionales te brindará un servicio integral para que disfrutes al
            máximo de tu inversión.
          </p>
          <img
            className="w-full rounded max-[375px]:hidden"
            src={ars}
            alt="foto de la empresa"
          />
        </article>
        <section>
          <h2 className="m-2 mt-14 font-bold text-3xl">Nuestra Historia</h2>
          <div className="mx-auto max-w-screen-xl ">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:items-center md:gap-8 lg:grid-cols-2 lg:items-center lg:gap-8">
              <p className="m-2 text-normal font-bold xl:text-xl text-justify">
                <span className="text-orange-500">ENCAVA</span>, fundada en
                1962, ha dejado una huella imborrable en el sector del
                transporte venezolano durante más de seis décadas. Su compromiso
                con la innovación y la satisfacción de las necesidades de
                movilidad del país la ha convertido en un referente en el
                mercado.<br></br>
                <br></br> Desde sus inicios, los autobuses de{" "}
                <span className="text-orange-500">ENCAVA</span> han sido
                pioneros en la evolución del transporte público en Venezuela. La
                empresa se estableció con el objetivo de ofrecer una combinación
                óptima de calidad, diseño, innovación, servicio y comprensión de
                las necesidades del país.<br></br>
                <br></br>Apoyandose en sus primeros logros y con un enfoque
                constante en la excelencia en todas las áreas de su negocio,
                emprendió un camino de crecimiento sostenido. Este camino no
                solo transformó a la empresa, sino también a todo el parque
                vehicular dedicado al transporte colectivo en el país, incluso
                antes de que <span className="text-orange-500">ENCAVA</span>{" "}
                cumpliera su primera década. En su evolución,{" "}
                <span className="text-orange-500">ENCAVA</span> se trasladó a un
                espacio diseñado para cumplir con sus objetivos: un terreno de
                110 mil metros cuadrados.Este espacio ha permitido las
                inversiones necesarias en infraestructura, capital humano y
                tecnología para consolidar su posición de liderazgo en el
                sector.
              </p>

              <img
                src={historia}
                className="rounded sm:w-full md:w-full lg:w-full xl:full"
                alt=""
              />
            </div>
          </div>
        </section>
        <section className="mt-10 mx-auto sm:py-24">
          <div className="rounded-2xl shadow-xl grid lg:grid-cols-2 gap-8 items-center bg-white">
            <div className=" flex items-center justify-center h-[400px] ">
              <img src={mision} width="350" alt="Placeholder image"></img>
            </div>
            <div className=" flex flex-col items-center lg:items-start justify-center">
              <h2 className=" mb-2 font-bold text-3xl">Mision</h2>
              <p className=" m-2 text-normal text-center font-bold lg:text-lg lg:text-left lg:m-0 mb-8 max-w-xl">
                Fabricar vehículos confiables a la medida de las necesidades de
                nuestros clientes y usuarios.
              </p>
            </div>
          </div>
        </section>
        <section className="mx-auto mt-4 sm:py-24">
          <div className="rounded-2xl shadow-xl grid lg:grid-cols-2 gap-8 items-center bg-white">
            <div className=" flex items-center justify-center h-[400px] ">
              <img src={vision} width="350" alt="Placeholder image"></img>
            </div>
            <div className=" flex flex-col items-center lg:items-start justify-center">
              <h2 className=" mb-2 font-bold text-3xl">Vision</h2>
              <p className=" m-2 text-normal text-center font-bold lg:text-lg lg:text-left lg:m-0 mb-8 max-w-xl">
                <span className="text-orange-500">ENCAVA</span> tiene por norte
                ser una empresa líder en el mercado. reconocida nacional e
                internacionalmente por su excelencia en la fabricación de
                autobuses y mini-buses gracias a la sistemática búsqueda de la
                calidad en todos sus productos y servicios, y al aporte
                fundamental de un personal altamente calificado y comprometido
                con la satisfacción de nuestros clientes.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-4 mx-auto  sm:py-24">
          <div className="rounded-2xl shadow-xl grid lg:grid-cols-2 gap-8 items-center bg-white">
            <div className=" flex items-center justify-center h-[400px] ">
              <img src={futuro} width="300" alt="Placeholder image"></img>
            </div>
            <div className=" flex flex-col items-center lg:items-start justify-center">
              <h2 className=" mb-2 font-bold text-3xl">Futuro</h2>
              <p className=" m-2 text-normal text-center font-bold lg:text-lg lg:text-left lg:m-0 mb-8 max-w-xl">
                <span className="text-orange-500">ENCAVA</span> ha demostrado
                ser como sus autobuses: confiable. resistente, cumplidora. Por
                eso transita hacia el futuro con la confianza de haber
                demostrado suficientemente su compromiso con las cosas bien
                hechas. Seguir ascendiendo requerirá, entonces, dar continuidad
                a una gestión caracterizada por el conocimiento de las
                necesidades del cliente, la alta calidad en productos y
                servicios, la inversión en tecnología, la búsqueda permanente de
                la seguridad y el confort, la innovación permanente y el
                incremento sostenido del contenido nacional, por nombrar solo
                algunos de los ingredientes que han compuesto la fórmula del
                éxito.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default SobrePage;
