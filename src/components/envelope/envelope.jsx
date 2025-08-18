import "./envelope.css";
import { useState } from "react";
import { useData } from "../../context/useData";
import { useTranslation } from "../../hooks/useTranslation";

const Envelope = ({ targetRef, audioRef, onEnvelopeClick }) => {
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
    
    // Hacer scroll suave hacia la portada
    setTimeout(() => {
      if (targetRef && targetRef.current) {
        // Verificar que el elemento esté en el DOM antes de hacer scroll
        const element = targetRef.current;
        
        if (element && element.getBoundingClientRect) {
          element.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" // Asegura que se detenga al inicio de la portada
          });
        }
      } else {
        console.error('❌ TargetRef no encontrado:', targetRef);
      }
    }, 8000); // Scroll después de que termine la animación del envelope y la portada esté lista

    // Iniciar el desvanecimiento del envelope DESPUÉS de que la portada esté visible
    setTimeout(() => {
      setIsFading(true);
    }, 5000); // 12 segundos para que la portada esté completamente visible

    // Ocultar completamente el envelope después de que termine la transición de fade-out
    setTimeout(() => {
      setIsCompletelyHidden(true);
    }, 9800); // 16.5 segundos (4.5s después del fade-out)

    // Llamar al callback después de que termine la transición
    setTimeout(() => {
      if (onEnvelopeClick) {
        onEnvelopeClick();
      }
    }, 9500); // 13.5 segundos para dar tiempo a ver la portada
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
          {/* <img className="envelope__image" src={envelope" alt="envelope" /> */}

        </div>
      </div>
    </section>
  );
};

export default Envelope;
