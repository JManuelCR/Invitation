import river from "../../assets/img/river.png";
import harry_potter from "../../assets/img/harry-potter.png";
import concert from "../../assets/img/concert.png";
import parque from "../../assets/img/park.png";
import street from "../../assets/img/street.png";
import { useKeenSlider } from "keen-slider/react";
import { useState, useEffect } from "react";
import "./we-said-yes.css";

const WeSaidYes = () => {
  const images = [river, harry_potter, concert, parque, street];
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 1,
      spacing: 20,
    },
    created() {
      setCurrentSlide(0);
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const goToSlide = (index) => {
    instanceRef.current?.moveToIdx(index);
  };
  
  useEffect(() => {
    if (!instanceRef.current) return;

    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 7000);

    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <section className="we-said-yes-container">
        <div className="we-said-yes-header">
            <h2 className="we-said-yes-title">Dijimos que
            sí</h2>
            <hr />
        </div>
      <div className="poem">
        <p className="poem-line">
        Amar a alguien es una cosa.
        </p>
        <p className="poem-line">
        Que alguien te ame es otra.
        </p>
        <p className="poem-line">
        Pero que te ame la misma persona que amas, lo es todo.
        </p>
        <p className="poem-author">
        -PAULO COELHO
        </p>
        </div>
        <section className="we-said-yes-slide-container">
            <div className="slider-container">
                <div ref={sliderRef} className="keen-slider">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="keen-slider__slide"
                        >
                            <div className="we-said-yes-slider-article-image">
                                <img
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="slider-indicators">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${currentSlide === index ? "active" : ""}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Ir al slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    </section>
  );
};
export default WeSaidYes;
