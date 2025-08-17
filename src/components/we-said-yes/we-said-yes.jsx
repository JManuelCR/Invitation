import river from "../../assets/img/bikes.jpg";
import harry_potter from "../../assets/img/harry-potter.png";
import concert from "../../assets/img/rammstein-concert.jpg";
import merida from "../../assets/img/merida.jpg";
import restaurante_meridad from "../../assets/img/restaurante-merida.jpg";
import restaurante_osa from "../../assets/img/restaurante-osos.jpg";
import six_flags from "../../assets/img/six_flags.png";
import six_flags_1 from "../../assets/img/six-flags-1.jpg";
import six_flags_2 from "../../assets/img/six-flags-2.jpg";
import six_flags_3 from "../../assets/img/six-flags-3.jpg";
import six_flags_4 from "../../assets/img/six-flags-4.jpg";
import berlin from "../../assets/img/berlin.jpg";
import divertidos_festival from "../../assets/img/divertidos.jpg";
import encantosa from "../../assets/img/encantosa.jpg";
import good_party from "../../assets/img/good.jpg";
import hamburguesas from "../../assets/img/hamburguesas.jpg";

import { useKeenSlider } from "keen-slider/react";
import { useState, useEffect } from "react";
import "./we-said-yes.css";
import { useTranslation } from "../../hooks/useTranslation";

const WeSaidYes = () => {
  const { t } = useTranslation();
  const images = [ river, harry_potter, concert, merida, restaurante_meridad, restaurante_osa, six_flags, six_flags_1, six_flags_2, six_flags_3, six_flags_4, berlin, divertidos_festival, encantosa, good_party, hamburguesas];
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
            <h2 className="we-said-yes-title">{t.weSaidYes.title}</h2>
            <hr />
        </div>
      <div className="poem">
        <p className="poem-line">
        {t.weSaidYes.poemLine1}
        </p>
        <p className="poem-line">
        {t.weSaidYes.poemLine2}
        </p>
        <p className="poem-line">
        {t.weSaidYes.poemLine3}
        </p>
        <p className="poem-author">
        -{t.weSaidYes.poemAuthor}
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
                                    className="we-said-yes-slider-article-image-img"
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
