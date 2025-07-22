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
import alamo from "../../assets/img/alamo.png";
import hertz from "../../assets/img/hertz.png";
import expedia from "../../assets/img/expedia.png";
import CarRental from "../car-rental/car-rental";
import googleMaps from "../../assets/img/google-maps.jpeg";
import alameda from "../../assets/img/alameda.jpg";
import antequera from "../../assets/img/antequera.jpg";
import aeropuertoTaxi from "../../assets/img/aeropuerto.jpg";
import GuysContact from "../guys-contact/guys-contact";
import marriott from "../../assets/img/marriott-oaxaca.jpg";

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
  {
    name: "City Centro by Marriott Oaxaca",
    image: marriott,
    link: "https://maps.app.goo.gl/bS66YCSfbDtSUovP7",
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

const carRentalOptions = [
  {
    name: "Alamo",
    image: alamo,
    link: "https://www.alamo.com.mx/es?gad_source=1&gad_campaignid=9861578867&gbraid=0AAAAADKZn1HN47s49Us1EByTjT1pB7-0S&gclid=CjwKCAjwp_LDBhBCEiwAK7Fnkkcc0EoSd3wLf4F7aKsw8VVpmsihygpWQddLLF3H8vGvPJPbFCJ0_BoClfQQAvD_BwE",
  },
  {
    name: "Hertz",
    image: hertz,
    link: "https://www.hertzmexico.com/tiempodeviajar/?utm_source=google&utm_medium=cpc&utm_campaign=nbrand&utm_content=MX&utm_term=&gad_source=1&gad_campaignid=20261631500&gbraid=0AAAAADq9hFXz8_sYEb8XIADG6XSJTNeak&gclid=CjwKCAjwp_LDBhBCEiwAK7FnklXd5LxV12ch_fCoE0pn4WZDH0Zs3X1C9-_rdJyV-tZM6vi9v2U7AxoCZ74QAvD_BwE",
  },
  {
    name: "Expedia",
    image: expedia,
    link: "https://www.expedia.mx/en/Cars?locale=en_US&siteid=12&semcid=MX.B.GOOGLE.BT-c-EN.CAR&semdtl=a118255096887.b1141026955265.g1kwd-396244913.e1c.m1CjwKCAjwp_LDBhBCEiwAK7FnknB12Hyje1w_E-eZiTrZmHykFn4kVo3nBsW-_sQEsZ6s-cQQCny8JxoCDHQQAvD_BwE.r181a9ca22777a8e2e53aadf63a732041e0bd032d5120f0b8e5b4b4fca6a2af082.c1bkGkwqjm6uSSDGpHQ5K-nw.j19047083.k1.d1624927108854.h1e.i1.l1.n1.o1.p1.q1.s1.t1.x1.f1.u1.v1.w1&gad_source=1&gad_campaignid=18255096887&gbraid=0AAAAACTxZ9Z6zmxXyH_vf9E9q6yUYHUhF&gclid=CjwKCAjwp_LDBhBCEiwAK7FnknB12Hyje1w_E-eZiTrZmHykFn4kVo3nBsW-_sQEsZ6s-cQQCny8JxoCDHQQAvD_BwE",
  },
];

const taxisOptions = [
  {
    name: "Taxis aeropuerto",
    image: aeropuertoTaxi,
    link: "tel:+52 951 224 8804"
  },
  {
    name: "Taxis Antequera",
    image: antequera,
    link: "tel:+52 951 515 4355"
  },
  {
    name: "Taxis Alameda",
    image: alameda,
    link: "tel:+52 9515162190"
  },
];

const TipsAndTricks = () => {
  return (
    <section className="tips-and-tricks-container">
      <div className="tips-and-tricks-header">
        <h2>Tips & Tricks</h2>
        <hr />
      </div>
      <p className="airport-recommendation-for-airport-taxi">Oaxaca es principal punto turístico en Mexico, aquí hay algunas sugerencias para que disfrutes aún más tu estadía.</p>
      <section className="tips-and-tricks-title-primary">
        <p className="tips-and-tricks-text">Hoteles sugeridos</p>
      </section>
      <TipsANdTricksSlider places={hoteles} />
      <section className="tips-and-tricks-title-primary">
        <p className="tips-and-tricks-text">Lugares para visitar</p>
      </section>
      <TipsANdTricksSlider places={suggestedPlaces} />
      <section className="tips-and-tricks-title-primary">
        <p className="tips-and-tricks-text">Car rental</p>
      </section>
      <CarRental rentalOptions={carRentalOptions} />
      <section className="tips-and-tricks-title-primary">
        <p className="tips-and-tricks-text downtown-instructions">
          Intrucciones para llegar al centro desde el aeropuerto
        </p>
      </section>
      <section className="airport-instructions-maps">
        <a href="https://maps.app.goo.gl/Mrk1s2jXLida2F2FA" target="_blank" rel="noopener noreferrer">
          <img
            src={googleMaps}
            className="airport-instructions-maps-google"
            alt="airport-instructions-maps-google"
          />
          <div className="airport-instructions-text-container">
            <p className="airport-instructions-text">Aeropuerto - centro</p>
            <span>...ver en google maps</span>
          </div>
        </a>
      </section>
      <section className="airport-recommendation-for-airport-taxi-container">
        <p className="airport-recommendation-for-airport-taxi">También puedes tomar un taxi del aeropuerto a la “zona 1” bajando en el templo de Santo Domingo</p>
      </section>
      <section className="tips-and-tricks-title-primary">
        <p className="tips-and-tricks-text">Taxis</p>
      </section>
      <CarRental rentalOptions={taxisOptions} />
      <section className="tips-and-tricks-title-primary">
        <p className="tips-and-tricks-text">Contacto</p>
      </section>
      <p className="airport-recommendation-for-airport-taxi">No estarás solo, si tienes algún inconveniente llámanos</p>
        <GuysContact />
    </section>
  );
};

export default TipsAndTricks;
