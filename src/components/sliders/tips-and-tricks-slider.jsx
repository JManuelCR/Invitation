import './tips-and-tricks-slider.css'
import { useState, useRef, useEffect } from 'react';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const TipsANdTricksSlider = ({places}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
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
        },
        created() {
            setCurrentSlide(0);
        },
        dragStart: handleUserInteraction,
        dragEnd: handleUserInteraction,
    });

    const goToSlide = (index) => {
        handleUserInteraction();
        instanceRef.current?.moveToIdx(index);
    };

    // Auto-play cada 3 segundos, solo si el usuario no está interactuando
    useEffect(() => {
        if (!instanceRef.current || isUserInteracting) return;
        const interval = setInterval(() => {
            instanceRef.current?.next();
        }, 3000);
        return () => clearInterval(interval);
    }, [instanceRef, isUserInteracting]);

    // Limpia el timeout al desmontar
    useEffect(() => {
        return () => {
            if (interactionTimeout.current) clearTimeout(interactionTimeout.current);
        };
    }, []);

    return <section className="tips-and-tricks-slide-container">
        <section className="tips-and-tricks-slider-container">

        <div className="slider-container">
            <div ref={sliderRef} className="keen-slider">
                {places.map((place, index) => (
                    <div key={index} className="keen-slider__slide">
                        <a href={place.link} target="_blank" rel="noopener noreferrer">
                            <article className="tips-and-tricks-slider-article">
                                {place.name && <h4 className="tips-and-tricks-slider-article-title">{place.name}</h4>}
                                {place.image && <div className="tips-and-tricks-slider-article-image"><img src={place.image} alt={place.name} /></div>}
                                <p className='tips-and-tricks-slider-article-text'>Haz click para ver <br />en Google Maps</p>
                            </article>
                        </a>
                    </div>
                ))}
            </div>
        </div>
        <div className="slider-indicators">
            {places.map((_, index) => (
                <button
                    key={index}
                    className={`indicator ${currentSlide === index ? "active" : ""}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Ir al slide ${index + 1}`}
                />
            ))}
        </div>
        </section>
        <section className="tips-and-tricks-slider-container-">

        </section>
    </section>
}

export default TipsANdTricksSlider;