import "./thanks.css";
import { useTranslation } from '../../hooks/useTranslation';

const Thanks = ({ person }) => {
  const { t } = useTranslation();
  return (
    <section className="thanks-container">
      <article className="thanks-card">
        <div className="tips-and-tricks-header header-alignment">
          {(person.guestReceptionAssistantConfirmation || person.guestChurchAssistantConfirmation)? (
            <h2>{t.thanks.title}</h2>
          ) : (
            <h2>{t.thanks.title2}</h2>
          )}
          <hr />
        </div>
        {(person.guestReceptionAssistantConfirmation || person.guestChurchAssistantConfirmation)? (
          <p className="thanks-title-text">{t.thanks.message}</p>
        ) : (
          <p className="thanks-title-text">{t.thanks.messageDismissInvitation}</p>
        )}
      </article>
    </section>
  );
};

export default Thanks;
