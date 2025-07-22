import "./guys-contact.css";
import whatsapp from "../../assets/img/WhatsApp_icon.png";

const GuysContact = () => {
    return (
        <section className="guys-contact-container">
            <div className="contactDetails">
                <p>Tlalli</p>
                <div className="execution">
                <a href="tel:+52 951 156 6888">+52 951 156 6888 <span>Llamar</span></a>
                <a href="https://wa.me/529511566888" target="_blank" rel="noopener noreferrer">
                <img src={whatsapp} alt="whatsapp" />
                <span>Whatsapp</span>
                </a>
                </div>
            </div>
            <div className="contactDetails">
                <p>Manu</p>
               <div className="execution">
               <a href="tel:+52 554 026 1932">+52 554 026 1932 <span>Llamar</span></a>
               <a href="https://wa.me/525540261932" target="_blank" rel="noopener noreferrer">
               <img src={whatsapp} alt="whatsapp" />
               <span>Whatsapp</span>
               </a>
               </div>
            </div>
            <p>Contacto</p>
        </section>
    )
}

export default GuysContact;