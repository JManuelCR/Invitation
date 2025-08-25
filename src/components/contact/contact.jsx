import "./contact.css";
import { useTranslation } from "../../hooks/useTranslation";
import GuysContact from "../guys-contact/guys-contact";

const Contact = ({ person }) => {
  const { t } = useTranslation();
  return (
    <section className="contact-container">
      <p className="contact-text">{t.tips.contact}</p>
      {
        person.guestReceptionAssistantConfirmation ? 
        <p className="not-alone-message">{t.tips.noAlone}</p>:
      <p className="not-alone-message">{t.tips.changeDecision}</p>
      }
      <GuysContact />
    </section>
  );
};

export default Contact;
