import "./envelope.css";
import { useState } from "react";
import { useData } from "../../context/useData";
import { useTranslation } from "../../hooks/useTranslation";

const Envelope = ({ targetRef, audioRef, onEnvelopeClick }) => {
  const { people, loading } = useData();
  const { t } = useTranslation();
  const [isFading, setIsFading] = useState(false);
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);

    const handleClick = () => {
    // Activar la apertura del envelope inmediatamente
    setIsEnvelopeOpened(true);
    
    // Reproducir audio si está disponible
    if (audioRef && audioRef.current) {
      audioRef.current.play();
    }
    
    // Iniciar el desvanecimiento después de que termine la animación del envelope
    setTimeout(() => {
      setIsFading(true);
    },5000); // Aumentado a 6 segundos para dar tiempo a ver la portada

    // Hacer scroll suave hacia la portada
    setTimeout(() => {
      if (targetRef && targetRef.current) {
        targetRef.current.scrollIntoView({ 
          behavior: "smooth", 
          block: "start" // Asegura que se detenga al inicio de la portada
        });
      }
    }, 9000); // Reducido a 7 segundos para que coincida con el fade-out

    // Llamar al callback después de que termine la transición
    setTimeout(() => {
      if (onEnvelopeClick) {
        onEnvelopeClick();
      }
    }, 10500); // Aumentado para dar tiempo a ver la portada
  };

  return (
    <section
      className={`envelope_background ${isFading ? "fade-out" : ""}`}
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
          </div>
        </section>{
          !isEnvelopeOpened ? (
          <button className="envelope__button" onClick={handleClick}>
            <span className="envelope__button-text">{t.envelope.open}</span>{" "}
            {loading ? t.envelope.loading : people}
          </button>
          ):('')
        }
        <div className="envelope__image-container">
          {/* <img className="envelope__image" src={envelope} alt="envelope" /> */}

        </div>
      </div>
    </section>
  );
};

export default Envelope;
