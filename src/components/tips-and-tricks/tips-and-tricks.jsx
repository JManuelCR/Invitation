import "./tips-and-tricks.css";
import quintaReal from "../../assets/img/quinta-real.png";
import one from "../../assets/img/one.png";
import fiestaAmericana from "../../assets/img/fiesta-americana.png";
import fortinPlaza from "../../assets/img/fortin-plaza.png";
import hollidayInn from "../../assets/img/holliday-inn-express.png";
import "keen-slider/keen-slider.min.css";
import TipsANdTricksSlider from "../sliders/tips-and-tricks-slider";
import huatulco from "../../assets/img/huatulco.png";
import puertoEscondido from "../../assets/img/puerto_escondido.png";
import mazunte from "../../assets/img/mazunte.png";
import sanJoseDelPacificoBenzaa from "../../assets/img/san_jose_del_pasifico_benzaa.png";
import sanJoseDelPacificoMiRanchito from "../../assets/img/San_Jose_del_Pacifico_mi_ranchito.jpg";
import monteAlban from "../../assets/img/monte_alban.png";
import mitla from "../../assets/img/mitla.jpg";
import mercado20deNoviembre from "../../assets/img/mercado_20_de_noviembre.jpg";
import barrioDeJalatlaco from "../../assets/img/barrio_de_jalatlaco.jpg";
import mercadoBenitoJuarez from "../../assets/img/mercado_benito_juarez.jpg";

const hoteles = [
  {
    name: "Quinta Real",
    image: quintaReal,
    link: "https://maps.app.goo.gl/WKGjhd2HvxyhqXhy5",
  },
  {
    name: "Fiesta Americana",
    image: fiestaAmericana,
    link: "https://maps.app.goo.gl/FJi5gKbNpdBqmYAa8",
  },
  {
    name: "One, Oaxaca Centro",
    image: one,
    link: "https://maps.app.goo.gl/sq3HNe7qJVJcVYa5A",
  },
  {
    name: "Fortin Plaza",
    image: fortinPlaza,
    link: "https://maps.app.goo.gl/drUmKNGRAoT5cm118",
  },
  {
    name: "Holliday Inn Express",
    image: hollidayInn,
    link: "https://maps.app.goo.gl/xKhPu6L4LMzthJ6AA",
  },
];
const suggestedPlaces = [
  {
    name: "Huatulco",
    image: huatulco,
    link: "https://maps.app.goo.gl/KnwB4aEW19LQkQDG8",
  },
  {
    name: "Puerto Escondido",
    image: puertoEscondido,
    link: "https://maps.app.goo.gl/uPvs98dJLED1r2iv9",
  },
  {
    name: "Mazunte",
    image: mazunte,
    link: "https://maps.app.goo.gl/GtUcVX6tMDrBo3cb6",
  },
  {
    name: "San José Del Pacifico - Benzaa",
    image: sanJoseDelPacificoBenzaa,
    link: "https://maps.app.goo.gl/3cvcjPCi2fe8uMgX6",
  },
  {
    name: "San José Del Pacifico - Mi ranchito",
    image: sanJoseDelPacificoMiRanchito,
    link: "https://maps.app.goo.gl/ZvG6o2TkBPv61Tc27",
  },
  {
    name: "Monte Albán",
    image: monteAlban,
    link: "https://maps.app.goo.gl/DGnxRhvFxGYu7Afe8",
  },
  {
    name: "Mitla",
    image: mitla,
    link: "https://maps.app.goo.gl/9PreLRRemPRcKJXy6",
  },
  {
    name: "Mercado 20 de noviembre",
    image: mercado20deNoviembre,
    link: "https://maps.app.goo.gl/4bPvve5nyNqNsABv9",
  },
  {
    name: "Barrio de Jalatlaco",
    image: barrioDeJalatlaco,
    link: "https://maps.app.goo.gl/XT1YoKgfHH2vehPH6",
  },
  {
    name: "Mercado Benito Juárez",
    image: mercadoBenitoJuarez,
    link: "https://maps.app.goo.gl/zUHtdMkQP5U3SEFD6",
  },
];

const TipsAndTricks = () => {
  return (
    <section className="tips-and-tricks-container">
      <div className="tips-and-tricks-header">
        <h2>Tips & Tricks</h2>
        <hr />
      </div>
      <section className="tips-and-tricks-title-container">
        <p className="tips-and-tricks-text">Hoteles sugeridos</p>
      </section>
      <TipsANdTricksSlider places={hoteles} />
      <section className="tips-and-tricks-title-container">
        <p className="tips-and-tricks-text">Lugares para visitar</p>
      </section>
      <TipsANdTricksSlider places={suggestedPlaces} />
    </section>
  );
};

export default TipsAndTricks;
