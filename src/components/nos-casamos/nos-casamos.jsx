import manu_buscando_a_tla from "../../assets/img/manu_buscando_a_tla.jpg";
import osa_smilling from "../../assets/img/osa-smilling.jpg";
import './nos-casamos.css'
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

export default function NosCasamos() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const { t } = useTranslation();

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
    <div className="header-alignment">
    <h2 className="nos-casamos-title">{t.weAreGettingMarried.title}</h2>
    <hr />
    </div>
    <section className="nos-casamos-images">
        <img className="image_manu" src={manu_buscando_a_tla} alt="manu_buscando_a_tla" />
        <img className="image_tla" src={osa_smilling} alt="tla_buscando_a_manu" />
    </section>
    <section>
    <p>{t.weAreGettingMarried.message_1}</p>
    <p>{t.weAreGettingMarried.message_2}</p>
    </section>
  </section>;
}