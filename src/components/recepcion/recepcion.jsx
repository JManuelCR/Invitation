import './recepcion.css';
import ListElement from '../list-item/list-element';
import image_recption from '../../assets/img/quinta-image.jpg';
import { useTranslation } from '../../hooks/useTranslation';

export default function Recption(){
    const { t } = useTranslation();
    const listElements = [
        { icon: "location", text: t.reception.address },
        { icon: "calendar", text: t.reception.date },
        { icon: "time", text: t.reception.time },
      ]
      return (
        <section className=" general-container recepcion-container">
          <header className="recepcion-container-header">
            <h2>{t.reception.title}</h2>
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
              <h3>{t.reception.location}</h3>
            <section className="directions">
            <ul className="list-elements">
                {listElements.map((element) => (
                  <ListElement key={element.icon} icon={element.icon} text={element.text} />
                ))}
              </ul>
            </section>
            <a className="button_primary" target="_blank" href="https://maps.app.goo.gl/NhWdcw7Z1nZhkE4n9">
              <span className="button_primary_text">{t.reception.map}</span>
            </a>
          </main>
        </section>
      );
}