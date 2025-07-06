import "./envelope.css";
import envelope from "../../assets/img/envelope.png";
import { useState } from "react";

import { useData } from "../../context/useData";

const Envelope = ({ text, targetRef, audioRef, onEnvelopeClick }) => {
  const { people, loading } = useData();
  const [isFading, setIsFading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    // Iniciar el desvanecimiento
    setIsFading(true);
    
    // Reproducir audio si está disponible
    if (audioRef && audioRef.current) {
      audioRef.current.play();
    }
    
    // Hacer scroll después de un pequeño delay para que el desvanecimiento sea visible
    setTimeout(() => {
      if (targetRef && targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 4000);
    
    // Llamar al callback después de que termine la transición
    setTimeout(() => {
      if (onEnvelopeClick) {
        onEnvelopeClick();
      }
    }, 4300);
    setTimeout(() => {
      setIsOpened(true);
    }, 5100);
  };


  return <section className={`envelope_background ${isFading ? 'fade-out' : ''} ${isOpened ? 'opened' : ''}`}>
    <div className="envelope__inner">
      <div className="envelope__image-container">
        <img className="envelope__image" src={envelope} alt="envelope" />
      <button className="envelope__button" onClick={handleClick}>
        <span className="envelope__button-text">{text}</span> {loading ? "Cargando..." : people}
      </button>
      </div>
    </div>
  </section>;
};

export default Envelope;