import "./envelope.css";
import { useState } from "react";
import { useData } from "../../context/useData";
import { useTranslation } from "../../hooks/useTranslation";

const Envelope = ({ audioRef, onEnvelopeClick }) => {
  const { people, loading } = useData();
  const { t } = useTranslation();
  const [isFading, setIsFading] = useState(false);
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [isCompletelyHidden, setIsCompletelyHidden] = useState(false);

    const handleClick = () => {
    // Activar la apertura del envelope inmediatamente
    setIsEnvelopeOpened(true);
    
    // Reproducir audio si está disponible
    if (audioRef && audioRef.current) {
      audioRef.current.play();
    }
    

         // Iniciar el desvanecimiento del envelope cuando termine su animación
     setTimeout(() => {
       setIsFading(true);
     }, 4000); // 3 segundos para que termine la animación del envelope

     // Ocultar completamente el envelope después de que termine la transición de fade-out
     setTimeout(() => {
       setIsCompletelyHidden(true);
     }, 7500); // 7.5s = 3s (animación) + 4.5s (transición CSS)

     // Llamar al callback después de que termine la transición
     setTimeout(() => {
       if (onEnvelopeClick) {
         onEnvelopeClick();
       }
     }, 8000); // 8 segundos para dar tiempo a ver la portada
  };

  return (
    <section
      className={`envelope_background ${isFading ? "fade-out" : ""} ${isCompletelyHidden ? "completely-hidden" : ""}`}
    >
      <div className="envelope__inner">
        <section className="envelope_animation_container">
          <div className={`wrapper ${isEnvelopeOpened ? 'opened' : ''}`}>
            <div className="lid one"></div>
            <div className="lid two"></div>
            <div className="envelope"></div>
            <div className="letter">
              <p>{t.envelope.letter_1}</p>
              <p>{t.envelope.letter_2}</p>
              <p>{t.envelope.letter_3}</p>
            </div>
            <div className="shadow"></div>
            {
          !isEnvelopeOpened ? (
          <button className="envelope__button" onClick={handleClick}>
            <span className="envelope__button-text">{t.envelope.open}</span>{" "}
            {loading ? t.envelope.loading : people}
          </button>
          ):('')
        }
          </div>
        </section>
      </div>
    </section>
  );
};

export default Envelope;
