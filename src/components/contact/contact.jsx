import "./contact.css";
import { useTranslation } from "../../hooks/useTranslation";
import GuysContact from "../guys-contact/guys-contact";

const Contact = () => {
  const { t } = useTranslation();
  return (
    <section className="contact-container">
          <p className="not-alone-message">{t.tips.noAlone}</p>
          <GuysContact />
    </section>
  )
}

export default Contact;