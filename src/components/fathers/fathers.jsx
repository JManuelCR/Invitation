import "./fathers.css";
import FathersInLawSlider from "../sliders/fathers-in-law-slider";

export default function Fathers() {
  const fathersData = [
    {
      title: "Padrinos de Velación",
      names: ["Mauro Aquino Cabrera", "Irma Paz Quintanar"]
    },
    {
      title: "Padrinos de Anillos",
      names: ["Pablo Herrerías Saenz", "Maria Aurora García Ramos"]
    },
    {
      title: "Padrinos de Lazo",
      names: ["Roberto Nazariega Barcelos", "Tania Karina Acero Valdes"]
    },
    {
      title: "Padrino de Arras",
      names: ["José Ángel Jiménez Canseco"]
    }
  ];

  return (
    <section className="fathers-container general-container">
      <article className="fathers-container-article">
        <p className="message">
          Con la bendición de nuestros padres, nos llena de alegría recordarte
          que formas parte de un momento muy especial para nosotros.
          <br /> Te invitamos con todo el corazón a ser testigo de nuestra
          unión.
        </p>
        <header className="ceremonia-container-header">
          <h2 className="fathers-title">Padres de la novia</h2>
          <hr />
        </header>
        <section className="fathers-container-section">
          <p>Donají Pérez Cruz</p>
          <p>Jorge Javier Bautista Perez</p>
        </section>
        <header className="ceremonia-container-header">
          <h2 className="fathers-title">Padres del novio</h2>
          <hr />
        </header>
        <section className="fathers-container-section">
          <p>Alejandra Clarivel Rojas Rojas</p>
          <p>Pastor Cabrera Castellanos</p>
        </section>
      </article>
      <section className="ceremonia-container-header">
          <h2 className="fathersInLaw-title">Padrinos de la boda</h2>
          <hr />
        </section>
        <p className="message">Sin ellos nada sería <br />igual</p>
        <FathersInLawSlider fathersData={fathersData} />

    </section>
  );
}
