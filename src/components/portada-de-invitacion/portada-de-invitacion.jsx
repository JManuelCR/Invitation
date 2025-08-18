import "./portada-de-invitacion.css";
import { useState, useEffect, forwardRef } from "react";
import { useTranslation } from "../../hooks/useTranslation";

const PortadaDeInvitacion = forwardRef((props, ref) => {
  const { t } = useTranslation();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  // Efecto para activar la entrada con fade-in
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 8500); // Comienza la entrada antes del scroll para que esté lista

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const targetDate = new Date("December 19, 2025 12:00:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        // Cálculo más robusto del tiempo restante
        const totalSeconds = Math.floor(difference / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);

        const days = totalDays;
        const hours = totalHours % 24;
        const minutes = totalMinutes % 60;
        const seconds = totalSeconds % 60;

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Ejecutar inmediatamente
    calculateTimeLeft();

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Función para formatear números con ceros a la izquierda
  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <section 
      className={`container-portada-de-invitacion ${isVisible ? 'fade-in' : ''}`} 
      ref={ref}
      id="portada-de-invitacion"
    >
      <header>
        <section className="title-and-phrase">
          <h1>{t.cover.title}</h1>
          <em>{t.cover.phrase}</em>
        </section>
      </header>
      <p className="see-on">{t.cover.seeOn}</p>
      <article className="time-count-container">
        <section className="time-section-counter">
          <span>{formatNumber(timeLeft.days)}</span>
          <span>{t.cover.days}</span>
        </section>
        <section className="time-section-counter">
          <span>{formatNumber(timeLeft.hours)}</span>
          <span>{t.cover.hours}</span>
        </section>
        <section className="time-section-counter">
          <span>{formatNumber(timeLeft.minutes)}</span>
          <span>{t.cover.minutes}</span>
        </section>
        <section className="time-section-counter seconds">
          <span>{formatNumber(timeLeft.seconds)}</span>
          <span>{t.cover.seconds}</span>
        </section>
      </article>
    </section>
  );
});

PortadaDeInvitacion.displayName = 'PortadaDeInvitacion';

export default PortadaDeInvitacion;
