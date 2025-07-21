import './asistan-confirmation.css';

const AsistanConfirmation = ({ totalPasses = 4 }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.passCount.value);
  };
  const handleNoAsistan = (e) => {
    e.preventDefault();
    console.log("No asistiré");
  }
  return (
    <section className="asistan-confirmation-container">
      <div className="dress-code-header">
        <h2 className="dress-code-header-title">Asistencia</h2>
        <hr />
      </div>
      <p className="asistan-confirmation-text">
        "Lo más importante para nosotros es compartir este momento contigo.
        Sabemos que es una fecha complicada, por eso te agradeceríamos mucho
        confirmar tu asistencia. Queremos organizar todo con cariño y medida,
        pensando en cada uno de ustedes."
      </p>
      <form className="asistan-confirmation-form" onSubmit={handleSubmit}>
      <h3 className="asistan-confirmation-title">Tienes {totalPasses} pases para ti y tu familia</h3>
        <label className="asistan-confirmation-label" htmlFor="passCount">
          <span className="asistan-confirmation-label-text">Pases a utilizar:</span>
          <select name="passCount" id="passCount">
                {Array.from({ length: totalPasses }, (_, index) => {
      const value = totalPasses - index;
      return (
        <option key={value} value={value}>
          {value}
        </option>
      );
    })}
          </select>
        </label>
      <section className="button-container">
        <button type="submit" className="button-confirmar-asistencia">Confirmar asistencia</button>
        <button className="button-no-asistir" onClick={handleNoAsistan}>No asistiré</button>
      </section>
      </form>
      <p>
        Por favor, consfirma tu asistencia antes de Octubre 15.
      </p>
    </section>
  );
};

export default AsistanConfirmation;
