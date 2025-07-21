import { useKeenSlider } from 'keen-slider/react';
import { useState, useEffect, useRef } from 'react';
import 'keen-slider/keen-slider.min.css';
import './fathers-in-law-slider.css';
import FathersInLawCard from '../fathers-in-law-card/fathers-in-law-card';

const FathersInLawSlider = ({ fathersData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const interactionTimeout = useRef(null);

  const handleUserInteraction = () => {
    setIsUserInteracting(true);
    if (interactionTimeout.current) clearTimeout(interactionTimeout.current);
    interactionTimeout.current = setTimeout(() => setIsUserInteracting(false), 8000);
  };

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 1,
      spacing: 20,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 1, spacing: 30 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 3000);
    },
    created() {
      setCurrentSlide(0);
      setIsAnimating(false);
    },
    dragStart: handleUserInteraction,
    dragEnd: handleUserInteraction,
  });

  const goToSlide = (index) => {
    handleUserInteraction();
    instanceRef.current?.moveToIdx(index);
  };

  // Auto-play cada 7 segundos, solo si el usuario no está interactuando
  useEffect(() => {
    if (!instanceRef.current || isUserInteracting) return;
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 7000);
    return () => clearInterval(interval);
  }, [instanceRef, isUserInteracting]);

  // Limpia el timeout al desmontar
  useEffect(() => {
    return () => {
      if (interactionTimeout.current) clearTimeout(interactionTimeout.current);
    };
  }, []);

  return (
    <div className="fathers-in-law-slider-container">
      <div ref={sliderRef} className="keen-slider">
        {fathersData.map((father, index) => (
          <div key={index} className="keen-slider__slide">
            <FathersInLawCard 
              title={father.title}
              names={father.names}
              isActive={currentSlide === index}
              isAnimating={isAnimating && currentSlide === index}
            />
          </div>
        ))}
      </div>
      
      <div className="slider-indicators">
        {fathersData.map((_, index) => (
          <button
            key={index}
            className={`indicator ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FathersInLawSlider;