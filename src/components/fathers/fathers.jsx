import "./fathers.css";
import FathersInLawSlider from "../sliders/fathers-in-law-slider";
import { useTranslation } from "../../hooks/useTranslation";
export default function Fathers() {
  const { t } = useTranslation();
  const fathersData = [
    {
      title: t.fathersInLaw.weddingGodParents,
      names: ["Mauro Aquino Cabrera", "Irma Paz Quintanar"]
    },
    {
      title: t.fathersInLaw.ringGodParents,
      names: ["Pablo Herrerías Saenz", "Maria Aurora García Ramos"]
    },
    {
      title: t.fathersInLaw.lazoGodParents,
      names: ["Roberto Nazariega Barcelos", "Tania Karina Acero Valdés"]
    },
    {
      title: t.fathersInLaw.arrasGodParents,
      names: ["José Ángel Jiménez Canseco"]
    }
  ];

  return (
    <section className="fathers-container general-container">
      <article className="fathers-container-article">
        <p className="message">
            {t.fathersInLaw.message}
          <br /> {t.fathersInLaw.messageComplement}
        </p>
        <header className="ceremonia-container-header">
          <h2 className="fathers-title">{t.fathersInLaw.titleBride}</h2>
          <hr />
        </header>
        <section className="fathers-container-section">
          <p>Donají Pérez Cruz</p>
          <p>Jorge Javier Bautista Pérez</p>
        </section>
        <header className="ceremonia-container-header">
          <h2 className="fathers-title">{t.fathersInLaw.titleGroom}</h2>
          <hr />
        </header>
        <section className="fathers-container-section">
          <p>Alejandra Clarivel Rojas Rojas</p>
          <p>Pastor Cabrera Castellanos</p>
        </section>
      </article>
      <section className="ceremonia-container-header">
          <h2 className="fathersInLaw-title">{t.fathersInLaw.titleWeddingFathersInLaw}</h2>
          <hr />
        </section>
        <p className="message">{t.fathersInLaw.honorMessage} <br />{t.fathersInLaw.honorMessageComplement}</p>
        <FathersInLawSlider fathersData={fathersData} />

    </section>
  );
}
