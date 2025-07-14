import { useState, useEffect, useRef } from "react";
import suit from "../../assets/img/suit.png";
import dress from "../../assets/img/dress.png";
import "./dress-code.css";

const DressCode = () => {
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
            <div className="dress-code-header">
                <h2 className="dress-code-header-title">Código de vestimenta</h2>
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
                <p className="dress-code-text-highlight">Formal</p>
                <p className="dress-code-text-item">Blanco reservado para la novia</p>
                <p className="dress-code-text-item">El clima promedio en la ciudad de Oaxaca en esta fecha es:</p>
                <p className="dress-code-text-item">26°max/10°min<br />
                0 días de lluvia</p>
                <p className="dress-code-text-item">Tipo de  piso de la recepción: <span className="dress-code-text-highlight">Jardín</span></p>
            </section>
        </section>
    )
}

export default DressCode;