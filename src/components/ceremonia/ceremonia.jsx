import "./ceremonia.css";
import image_ceremonia from "../../assets/santo_domingo.jpeg";
import image_quinta from "../../assets/quinta_san_pedro.jpeg";


export default function Ceremonia() {
  return (
    <section className="ceremonia-container general-container">
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
        <section className="directions"></section>
        <button className="button_primary">
          <span className="button_primary_text">Ver el mapa</span>
        </button>
      </main>
    </section>
  );
}
