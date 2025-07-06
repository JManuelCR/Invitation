import "./ceremonia.css";
import image_ceremonia from "../../assets/img/santo_domingo.jpeg";
import ListElement from "../list-item/list-element";


export default function Ceremonia() {
  const listElements = [
    { icon: "location", text: "C. Macedonio Alcalá s/n, RUTA INDEPENDENCIA, Centro, 68000 Oaxaca de Juárez, Oax." },
    { icon: "calendar", text: "Viernes 19 de diciembre 2025" },
    { icon: "time", text: "12:00 PM" },
  ]
  return (
    <section className=" general-container ceremonia-container">
      <header className="ceremonia-container-header">
        <h2>Ceremonia</h2>
        <hr />
      </header>
      <main className="ceremonia-container-main">
        <div className="ceremonia-image-container">
          <img
            src={image_ceremonia}
            alt="Ceremonia"
            className="image_ceremonia"
          />
        </div>
          <h3>Templo de Santo Domingo de Guzmán</h3>
        <section className="directions">
        <ul className="list-elements">
            {listElements.map((element) => (
              <ListElement key={element.icon} icon={element.icon} text={element.text} />
            ))}
          </ul>
        </section>
        <a className="button_primary" target="_blank" href="https://maps.app.goo.gl/mpWTqoDGWFhyyx9j6">
          <span className="button_primary_text">Ver el mapa</span>
        </a>
      </main>
    </section>
  );
}
