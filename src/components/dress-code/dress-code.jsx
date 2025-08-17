import { useState, useEffect, useRef } from "react";
import suit from "../../assets/img/suit.png";
import dress from "../../assets/img/dress.png";
import "./dress-code.css";
import { useTranslation } from "../../hooks/useTranslation";

const DressCode = () => {
    const { t } = useTranslation();
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
                threshold: 0.3, // Trigger when 30% of the element is visible
                rootMargin: '0px 0px -50px 0px'
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

    return (
        <section className="dress-code-container" ref={containerRef}>
            <div className="dress-code-header header-alignment">
                <h2 className="dress-code-header-title">{t.dressCode.title}</h2>
                <hr />
            </div>
            <section className={`images-container ${isVisible ? 'animate' : ''}`}>
                <div className={`suit-container ${isVisible ? 'animate' : ''}`}>
                    <img src={suit} alt="suit-image" />
                </div>
                <div className={`dress-container ${isVisible ? 'animate' : ''}`}>
                    <img src={dress} alt="dress-image" />
                </div>
            </section>
            <section className="dress-code-text">
                <p className="dress-code-text-highlight">{t.dressCode.formal}</p>
                <p className="dress-code-text-item">{t.dressCode.brideReserved}</p>
                <p className="dress-code-text-item">{t.dressCode.weather}</p>
                <p className="dress-code-text-item">{t.dressCode.weatherMaxMin}<br />
                {t.dressCode.weatherRain}</p>
                <p className="dress-code-text-item">{t.dressCode.floorType} <span className="dress-code-text-highlight">{t.dressCode.floorTypeHighlight}</span></p>
            </section>
        </section>
    )
}

export default DressCode;