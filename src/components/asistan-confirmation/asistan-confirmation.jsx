import "./asistan-confirmation.css";
import { useForm } from "react-hook-form";
import { useTranslation } from "../../hooks/useTranslation";
import { useState, useEffect } from "react";
import { patchGuest } from "../../services/apdiPeopleService";
import { useData } from "../../context/useData";

const AsistanConfirmation = ({ scrollToTravel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      passCount: "",
      foodPreference: "",
      chickenCount: "",
      porkCount: "",
    },
  });

  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    person,
    updatePerson
  } = useData();

  // Observar los valores del formulario
  const watchedValues = watch();

  // Obtener valores actuales
  const currentPassCount = parseInt(watchedValues.passCount) || 0;
  const currentChickenCount = parseInt(watchedValues.chickenCount) || 0;
  const currentPorkCount = parseInt(watchedValues.porkCount) || 0;

  // Generar opciones para chickenCount basadas en pases disponibles
  const chickenCountOptions = () => {
    if (currentPassCount === 0) return [];

    const options = [];

    // Permitir elegir desde 0 hasta el total de pases
    for (let i = 0; i <= currentPassCount; i++) {
      options.push(
        <option key={i} value={i}>
          {i}{" "}
          {i <= 1
            ? t?.confirmation?.chicken || "Pollo"
            : t?.confirmation?.chickenPlural || "Pollos"}
        </option>
      );
    }

    return options;
  };

  // Generar opciones para porkCount basadas en pases disponibles
  const porkCountOptions = () => {
    if (currentPassCount === 0) return [];

    const options = [];

    // Permitir elegir desde 0 hasta el total de pases
    for (let i = 0; i <= currentPassCount; i++) {
      options.push(
        <option key={i} value={i}>
          {i}{" "}
          {i <= 1
            ? t?.confirmation?.pork || "Cerdo"
            : t?.confirmation?.porkPlural || "Cerdos"}
        </option>
      );
    }

    return options;
  };

  // Resetear chickenCount y porkCount cuando cambie el número de pases
  useEffect(() => {
    if (currentPassCount === 0) {
      setValue("chickenCount", "");
      setValue("porkCount", "");
    }
  }, [currentPassCount, setValue]);

  // Auto-ajustar el otro campo cuando uno cambie para mantener la suma correcta
  useEffect(() => {
    if (currentPassCount > 0) {
      // Si se seleccionó pollo, auto-ajustar cerdo
      if (currentChickenCount > 0 && currentChickenCount <= currentPassCount) {
        const remainingPork = currentPassCount - currentChickenCount;
        setValue("porkCount", remainingPork.toString());
      }

      // Si se seleccionó cerdo, auto-ajustar pollo
      if (currentPorkCount > 0 && currentPorkCount <= currentPassCount) {
        const remainingChicken = currentPassCount - currentPorkCount;
        setValue("chickenCount", remainingChicken.toString());
      }
    }
  }, [currentChickenCount, currentPorkCount, currentPassCount, setValue]);

  // Función para manejar el cambio de pollo
  const handleChickenChange = (e) => {
    const chickenValue = parseInt(e.target.value) || 0;
    setValue("chickenCount", chickenValue.toString());

    if (chickenValue > 0 && currentPassCount > 0) {
      // Auto-ajustar cerdo para cubrir el resto de pases
      const remainingPork = currentPassCount - chickenValue;
      setValue("porkCount", remainingPork.toString());
    }
  };

  // Función para manejar el cambio de cerdo
  const handlePorkChange = (e) => {
    const porkValue = parseInt(e.target.value) || 0;
    setValue("porkCount", porkValue.toString());

    if (porkValue > 0 && currentPassCount > 0) {
      // Auto-ajustar pollo para cubrir el resto de pases
      const remainingChicken = currentPassCount - porkValue;
      setValue("chickenCount", remainingChicken.toString());
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitMessage("");

      const updateData = {
        guestParticipation: parseInt(data.passCount),
        guestChickenCountDesire: parseInt(data.chickenCount) || 0,
        guestPorkCountDesire: parseInt(data.porkCount) || 0,
        guestInvitationResponse: true,
        guestChurchAssistantConfirmation: data.churchAssistant === "true",
        guestReceptionAssistantConfirmation: data.receptionAssistant === "true",
      };

      // Solo incluir foreignerTransport si es un extranjero
      if (person.foreignGuest === "YES") {
        updateData.guestForeignerTransport = data.foreignerTransport === "true";
      }
      
    
      // Hacer el patch al servidor primero
      await patchGuest(person.guestInvitationId, updateData);
      
      // Si el patch fue exitoso, actualizar el estado global del contexto
      updatePerson(updateData);

      setSubmitMessage(`${t.confirmation.confirmationSend}`);
      setTimeout(() => {
        scrollToTravel();
      }, 500);
    } catch (error) {
      console.error(`${t.confirmation.formErrorSend}`, error);
      setSubmitMessage(`${t.confirmation.formErrorTryAgain}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNoAsistan = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setSubmitMessage("");

      const updateData = {
        guestParticipation: 0,
        guestInvitationResponse: true,
        guestChickenCountDesire: 0,
        guestPorkCountDesire: 0,
        guestChurchAssistantConfirmation: false,
        guestReceptionAssistantConfirmation: false,
      };

      // Solo incluir foreignerTransport si es un extranjero
      if (person.foreignGuest === "YES") {
        updateData.guestForeignerTransport = false;
      }
      
      
      // Hacer el patch al servidor primero
      await patchGuest(person.guestInvitationId, updateData);
      
      // Si el patch fue exitoso, actualizar el estado global del contexto
      updatePerson(updateData);
      
      
      setSubmitMessage(`${t.confirmation.thanksForDeclineConfirmation}`);
      setTimeout(() => {
        scrollToTravel();
      }, 500);
    } catch (error) {
      console.error(`${t.confirmation.errorDeclineConfirmation}`, error);
      setSubmitMessage(`${t.confirmation.errorDeclineConfirmationTryAgain}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  // Debug: Verificar datos

  return (
    <section className="asistan-confirmation-container">
      <div className="dress-code-header header-alignment">
        <h2 className="dress-code-header-title">
          {t?.confirmation?.title || "Confirmación de Asistencia"}
        </h2>
        <hr />
      </div>

      <p className="asistan-confirmation-text">
        {t.confirmation.confirmationMessage}
      </p>
      {
        person.guestInvitationResponse ? (
          <h2 className="asistan-confirmation-text">{t.confirmation.alreadyConfirmed}</h2>
        ) :(   <form
          className="asistan-confirmation-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="asistan-confirmation-title">
            {t.confirmation.confirmationMessageComplement}{" "}
            {person.guestPassesNumberToRecibe}{" "}
            {t.confirmation.confirmationMessageComplement2}
          </h3>
  
          <label className="asistan-confirmation-label" htmlFor="passCount">
            <span className="asistan-confirmation-label-text">
              {t.confirmation.passesToUse}
            </span>
            <select
              name="passCount"
              id="passCount"
              {...register("passCount", {
                required:
                  watchedValues.churchAssistant === "true" ||
                  watchedValues.receptionAssistant === "true"
                    ? `${t.confirmation.passRequiere}`
                    : false,
                validate: (value) => {
                  // Si ambos son false, no se requiere validación
                  if (
                    watchedValues.churchAssistant === "false" &&
                    watchedValues.receptionAssistant === "false"
                  ) {
                    return true;
                  }
                  // Si al menos uno es true, se debe seleccionar un número de pases
                  return (
                    value !== "" &&
                    value !== `${t.confirmation.selectAPassNumber}`
                  );
                },
              })}
              disabled={isSubmitting}
            >
              <option value="">{t.confirmation.selectPasses}</option>
              {Array.from(
                { length: person.guestPassesNumberToRecibe },
                (_, index) => {
                  const value = person.guestPassesNumberToRecibe - index;
                  return (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  );
                }
              )}
            </select>
            {errors.passCount && (
              <span className="error">{errors.passCount.message}</span>
            )}
          </label>
  
          {/*No asistir*/}
          {currentPassCount === 0 ? (
            <>
              <section className="noAssistant-section">
                <p>{t.confirmation.noAssistantMessage}</p>
                <button
                  type="button"
                  className="button-no-asistir"
                  onClick={handleNoAsistan}
                  disabled={isSubmitting || person.guestInvitationResponse}
                >
                  {t.confirmation.willNotAttend}
                </button>
              </section>
            </>
          ) : (
            <></>
          )}
  
          {/*Asistir*/}
          {currentPassCount === 0 ? (
            <></>
          ) : (
            <>
              <label
                className="asistan-confirmation-label"
                htmlFor="churchAssistant"
              >
                <span className="asistan-confirmation-label-text">
                  {t.confirmation.churchAssistant}
                </span>
                <select
                  name="churchAssistant"
                  id="churchAssistant"
                  {...register("churchAssistant", {
                    required: false,
                    validate: (value) => {
                      // Si receptionAssistant es false, este campo no es requerido
                      if (value === "") {
                        return `${t.confirmation.selectAnOption}`;
                      }
                      // Si receptionAssistant es true, este campo debe tener un valor válido
                      return true;
                    },
                  })}
                >
                  <option value="">{t.confirmation.selectOption}</option>
                  <option value="true">{t.confirmation.yes}</option>
                  <option value="false">{t.confirmation.no}</option>
                </select>
                {errors.churchAssistant && (
                  <span className="error">{errors.churchAssistant.message}</span>
                )}
              </label>
              <label
                htmlFor="receptionAssistant"
                className="asistan-confirmation-label"
              >
                <span className="asistan-confirmation-label-text">
                  {t.confirmation.receptionAssistant}
                </span>
                <select
                  type="checkbox"
                  name="receptionAssistant"
                  id="receptionAssistant"
                  {...register("receptionAssistant", {
                    required: false,
                    validate: (value) => {                    // Si churchAssistant es false, este campo no es requerido
                      if (value === "") {
                        return `${t.confirmation.selectAnOption}`;
                      }
                      return true;
                      // Si churchAssistant es true, este campo debe tener un valor válido
                    },
                  })}
                >
                  <option value="">{t.confirmation.selectOption}</option>
                  <option value="true">{t.confirmation.yes}</option>
                  <option value="false">{t.confirmation.no}</option>
                </select>
                {errors.receptionAssistant && (
                  <span className="error">
                    {errors.receptionAssistant.message}
                  </span>
                )}
              </label>
              {/* Campo de transporte para extranjeros */}
              {person.guestForeigner === "YES" &&
              watchedValues.churchAssistant === "true" &&
              watchedValues.receptionAssistant === "true" ? (
                <div className="foreigner-transport-field">
                  <label
                    className="asistan-confirmation-label"
                    htmlFor="foreignerTransport"
                  >
                    <span className="asistan-confirmation-label-text">
                      {t?.confirmation?.foreignerTransport || ""}
                    </span>
                    <select
                      name="foreignerTransport"
                      id="foreignerTransport"
                      {...register("foreignerTransport", {
                        required: `${t.confirmation.passRequiere}`,
                      })}
                      disabled={isSubmitting}
                    >
                      <option value="">
                        {t?.confirmation?.selectOption || ""}
                      </option>
                      <option value="true">{t?.confirmation?.yes || ""}</option>
                      <option value="false">{t?.confirmation?.no || ""}</option>
                    </select>
                  {errors.foreignerTransport && (
                    <span className="error">
                      {errors.foreignerTransport.message}
                    </span>
                  )}
                  </label>
                </div>
              ) : null}
  
              <span className="asistan-confirmation-label-text">
                {t.confirmation.confirmationMessageComplement3}
              </span>
  
              {/* Indicador de distribución de pases */}
              {currentPassCount > 0 && watchedValues.receptionAssistant === "true" && (
                <div className="passes-distribution-info">
                  <p>
                    <strong>{t.confirmation.passDistribution}</strong>
                    {currentChickenCount > 0 &&
                      ` ${currentChickenCount} ${t.confirmation.chicken}${
                        currentChickenCount > 1 ? "s" : ""
                      }`}
                    {currentChickenCount > 0 && currentPorkCount > 0 && " + "}
                    {currentPorkCount > 0 &&
                      ` ${currentPorkCount} ${t.confirmation.pork}${
                        currentPorkCount > 1 ? "s" : ""
                      }`}
                    {currentChickenCount === 0 &&
                      currentPorkCount === 0 &&
                      `${t.confirmation.selectQuantities}`}
                    {currentChickenCount + currentPorkCount ===
                      currentPassCount && (
                      <span className="valid-distribution">
                        {" "}
                        ✓ {t.confirmation.completed}
                      </span>
                    )}
                    {currentChickenCount + currentPorkCount >
                      currentPassCount && (
                      <span className="invalid-distribution">
                        {" "}
                        ✗ {t.confirmation.exceded}
                      </span>
                    )}
                  </p>
                </div>
              )}
  
              {/* Campos de comida - solo aparecen si hay pases seleccionados */}
              {currentPassCount > 0 &&
              watchedValues.receptionAssistant === "true" ? (
                <>
                  <label
                    className="asistan-confirmation-label"
                    htmlFor="chickenCount"
                  >
                    <span className="asistan-confirmation-label-text">
                      {currentPassCount > 1
                        ? t?.confirmation?.chickenCount || ""
                        : t?.confirmation?.chicken || ""}
                    </span>
                    <select
                      name="chickenCount"
                      id="chickenCount"
                      {...register("chickenCount", {
                        required: `${t.confirmation.passRequiere}`,
                        validate: (value) => {
                          const chicken = parseInt(value) || 0;
                          const pork = currentPorkCount;
                          return (
                            chicken + pork === currentPassCount ||
                            `${t.confirmation.dishesSum}`
                          );
                        },
                      })}
                      disabled={isSubmitting}
                      onChange={handleChickenChange}
                    >
                      <option value="">
                        {t?.confirmation?.selectOption || ""}
                      </option>
                      {chickenCountOptions()}
                    </select>
                    {errors.chickenCount && (
                      <span className="error">{errors.chickenCount.message}</span>
                    )}
                  </label>
  
                  <label
                    className="asistan-confirmation-label"
                    htmlFor="porkCount"
                  >
                    <span className="asistan-confirmation-label-text">
                      {currentPassCount > 1
                        ? t?.confirmation?.porkCount || ""
                        : t?.confirmation?.pork || ""}
                    </span>
                    <select
                      name="porkCount"
                      id="porkCount"
                      {...register("porkCount", {
                        required: `${t.confirmation.passRequiere}`,
                        validate: (value) => {
                          const pork = parseInt(value) || 0;
                          const chicken = currentChickenCount;
                          return (
                            chicken + pork === currentPassCount ||
                            `${t.confirmation.dishesSum}`
                          );
                        },
                      })}
                      disabled={isSubmitting}
                      onChange={handlePorkChange}
                    >
                      <option value="">
                        {t?.confirmation?.selectOption || ""}
                      </option>
                      {porkCountOptions()}
                    </select>
                    {errors.porkCount && (
                      <span className="error">{errors.porkCount.message}</span>
                    )}
                  </label>
                </>
              ) : null}
  
              {isSubmitting ? (
                <p>{t.confirmation.sending}</p>
              ) : (
                <section className="button-container">
                  {(watchedValues.churchAssistant !== "false" ||
                  watchedValues.receptionAssistant !== "false") ? (
                    <>
                      <button
                        type="submit"
                        className="button-confirmar-asistencia"
                        disabled={isSubmitting || person?.guestInvitationResponse}
                      >
                        {t.confirmation.confirmAttendance}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="button-no-asistir"
                        onClick={handleNoAsistan}
                        disabled={isSubmitting || person?.guestInvitationResponse}
                      >
                        {t.confirmation.willNotAttend}
                      </button>
                    </>
                  )}
                </section>
              )}
            </>
          )}
        </form>)
      }
   
      {submitMessage && (
        <div
          className={`submit-message ${
            submitMessage.includes("Error") ? "error" : "success"
          }`}
        >
          {submitMessage}
        </div>
      )}

      <p>{t.confirmation.deadlineMessage}</p>
    </section>
  );
};

export default AsistanConfirmation;
