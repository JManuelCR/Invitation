import "./ceremonia.css";
import image_ceremonia from "../../assets/img/santo_domingo.jpeg";
import ListElement from "../list-item/list-element";
import { useTranslation } from "../../hooks/useTranslation";

export default function Ceremonia() {
  const { t } = useTranslation();
  const listElements = [
    { icon: "location", text: t.ceremony.address },
    { icon: "calendar", text: t.ceremony.date },
    { icon: "time", text: t.ceremony.time },
  ]
  return (
    <section className=" general-container ceremonia-container">
      <header className="ceremonia-container-header">
        <h2>{t.ceremony.title}</h2>
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
          <h3>{t.ceremony.location}</h3>
        <section className="directions">
        <ul className="list-elements">
            {listElements.map((element) => (
              <ListElement key={element.icon} icon={element.icon} text={element.text} />
            ))}
          </ul>
        </section>
        <a className="button_primary" target="_blank" href="https://maps.app.goo.gl/mpWTqoDGWFhyyx9j6">
          <span className="button_primary_text">{t.ceremony.map}</span>
        </a>
      </main>
    </section>
  );
}
