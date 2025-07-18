import manu_buscando_a_tla from "../../assets/img/manu_buscando_a_tla.png";
import tla_buscando_a_manu from "../../assets/img/tla_buscando_a_manu.png";
import './nos-casamos.css'
import { useState, useEffect, useRef } from 'react';

export default function NosCasamos() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Se activa cuando el 30% del elemento es visible
        rootMargin: '0px 0px -50px 0px' // Se activa un poco antes
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return <section className={`nos-casamos-container ${isVisible ? 'visible' : ''}`} ref={containerRef}>
    <h2 className="nos-casamos-title">¡Nos Casaremos!</h2>
    <section className="nos-casamos-images">
        <img className="image_manu" src={manu_buscando_a_tla} alt="manu_buscando_a_tla" />
        <img className="image_tla" src={tla_buscando_a_manu} alt="tla_buscando_a_manu" />
    </section>
    <p>
    ¡Nos complace compartir con ustedes nuestra alegría y anunciar que nos casamos! Es un honor para nosotros invitarles a celebrar este día tan especial. Únanse a nosotros para celebrar el amor, la amistad y el comienzo de esta nueva etapa en nuestras vidas.
    </p>
  </section>;
}