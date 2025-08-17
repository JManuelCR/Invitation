import "./thanks.css";
import { useTranslation } from '../../hooks/useTranslation';

const Thanks = () => {
  const { t } = useTranslation();
  return (
    <section className="thanks-container">
      <article className="thanks-card">
        <div className="tips-and-tricks-header header-alignment">
          <h2>{t.thanks.title}</h2>
          <hr />
        </div>
        <p className="thanks-title-text">{t.thanks.message}</p>
      </article>
    </section>
  );
};

export default Thanks;
