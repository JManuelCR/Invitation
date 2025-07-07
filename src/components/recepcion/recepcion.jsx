import './recepcion.css';
import ListElement from '../list-item/list-element';
import image_recption from '../../assets/img/quinta-image.jpg';

export default function Recption(){
    const listElements = [
        { icon: "location", text: "Carr. Puerto Escondido - Oaxaca S/N, Centro, 71700 Zimatlán de Álvarez, Oax." },
        { icon: "calendar", text: "Viernes 19 de diciembre 2025" },
        { icon: "time", text: "14:30 PM" },
      ]
      return (
        <section className=" general-container recepcion-container">
          <header className="recepcion-container-header">
            <h2>Recepción</h2>
            <hr />
          </header>
          <main className="recepcion-container-main">
            <div className="recepcion-image-container">
              <img
                src={image_recption}
                alt="Recepción"
                className="image_recepcion"
              />
            </div>
              <h3>Quinta Real San Pedro</h3>
            <section className="directions">
            <ul className="list-elements">
                {listElements.map((element) => (
                  <ListElement key={element.icon} icon={element.icon} text={element.text} />
                ))}
              </ul>
            </section>
            <a className="button_primary" target="_blank" href="https://maps.app.goo.gl/NhWdcw7Z1nZhkE4n9">
              <span className="button_primary_text">Ver el mapa</span>
            </a>
          </main>
        </section>
      );
}