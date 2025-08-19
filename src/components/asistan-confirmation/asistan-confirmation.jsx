import "./asistan-confirmation.css";
import { useForm } from "react-hook-form";
import { useTranslation } from "../../hooks/useTranslation";
import { useState, useEffect } from "react";
import { patchGuest } from "../../services/apdiPeopleService";

const AsistanConfirmation = ({
  totalPasses = 4,
  guestId,
  isSubmitted = false,
  foreignGuest = "NO",
}) => {
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
          {i === 1
            ? t?.confirmation?.chicken || "Pollo"
            : t?.confirmation?.chicken || "Pollos"}
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
          {i === 1
            ? t?.confirmation?.pork || "Cerdo"
            : t?.confirmation?.pork || "Cerdos"}
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
        guestChurchAssistant: data.churchAssistant === "true",
        guestReceptionAssistant: data.receptionAssistant === "true",
      };

      // Solo incluir foreignerTransport si es un extranjero
      if (foreignGuest === "YES") {
        updateData.guestForeignerTransport = data.foreignerTransport === "true";
      }

      await patchGuest(guestId, updateData);

      setSubmitMessage("¡Confirmación enviada exitosamente!");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSubmitMessage("Error al enviar la confirmación. Intenta de nuevo.");
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
        guestChurchAssistant: false,
        guestReceptionAssistant: false,
      };

      // Solo incluir foreignerTransport si es un extranjero
      if (foreignGuest === "YES") {
        updateData.guestForeignerTransport = false;
      }

      await patchGuest(guestId, updateData);

      setSubmitMessage(
        "Gracias por tu respuesta. Lamentamos que no puedas asistir."
      );
    } catch (error) {
      console.error("Error al declinar asistencia:", error);
      setSubmitMessage("Error al procesar tu respuesta. Intenta de nuevo.");
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

      {submitMessage && (
        <div
          className={`submit-message ${
            submitMessage.includes("Error") ? "error" : "success"
          }`}
        >
          {submitMessage}
        </div>
      )}

      <form
        className="asistan-confirmation-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="asistan-confirmation-title">
          {t.confirmation.confirmationMessageComplement} {totalPasses}{" "}
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
              required: "Este campo es requerido",
              validate: (value) =>
                value !== "" || "Selecciona un número de pases",
            })}
            disabled={isSubmitting}
          >
            <option value="">{t.confirmation.selectPasses}</option>
            {Array.from({ length: totalPasses }, (_, index) => {
              const value = totalPasses - index;
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              );
            })}
          </select>
          {errors.passCount && (
            <span className="error">{errors.passCount.message}</span>
          )}
        </label>
        <label className="asistan-confirmation-label" htmlFor="churchAssistant">
          <span className="asistan-confirmation-label-text">
            {t.confirmation.churchAssistant}
          </span>
          <select
            name="churchAssistant"
            id="churchAssistant"
            {...register("churchAssistant", {
              required: "Este campo es requerido",
              validate: (value) => value !== "" || "Selecciona una opción",
            })}
          >
            <option value="true">{t.confirmation.yes}</option>
            <option value="false">{t.confirmation.no}</option>
          </select>
        </label>
        <label htmlFor="receptionAssistant">
          <span className="asistan-confirmation-label-text">
            {t.confirmation.receptionAssistant}
          </span>
          <select
            type="checkbox"
            name="receptionAssistant"
            id="receptionAssistant"
            {...register("receptionAssistant", {
              required: "Este campo es requerido",
              validate: (value) => value !== "" || "Selecciona una opción",
            })}
          >
            <option value="true">{t.confirmation.yes}</option>
            <option value="false">{t.confirmation.no}</option>
          </select>
        </label>
        {/* Campo de transporte para extranjeros */}
        {foreignGuest === "YES" &&
        watchedValues.churchAssistant === "true" &&
        watchedValues.receptionAssistant === "true" ? (
          <div className="foreigner-transport-field">
            <label
              className="asistan-confirmation-label"
              htmlFor="foreignerTransport"
            >
              <span className="asistan-confirmation-label-text">
                {t?.confirmation?.foreignerTransport || "¿Necesitas transporte?"}
              </span>
              <select
                name="foreignerTransport"
                id="foreignerTransport"
                {...register("foreignerTransport", {
                  required: "Este campo es requerido",
                })}
                disabled={isSubmitting}
              >
                <option value="">
                  {t?.confirmation?.selectOption || "Selecciona"}
                </option>
                <option value="true">{t?.confirmation?.yes || "Sí"}</option>
                <option value="false">{t?.confirmation?.no || "No"}</option>
              </select>
            </label>
          </div>
        ) : null}

        <span className="asistan-confirmation-label-text">
          {t.confirmation.confirmationMessageComplement3}
        </span>

        {/* Indicador de distribución de pases */}
        {currentPassCount > 0 && (
          <div className="passes-distribution-info">
            <p>
              <strong>Distribución de pases:</strong>
              {currentChickenCount > 0 &&
                ` ${currentChickenCount} pollo${
                  currentChickenCount > 1 ? "s" : ""
                }`}
              {currentChickenCount > 0 && currentPorkCount > 0 && " + "}
              {currentPorkCount > 0 &&
                ` ${currentPorkCount} cerdo${currentPorkCount > 1 ? "s" : ""}`}
              {currentChickenCount === 0 &&
                currentPorkCount === 0 &&
                " Selecciona las cantidades"}
              {currentChickenCount + currentPorkCount === currentPassCount && (
                <span className="valid-distribution"> ✓ Completado</span>
              )}
              {currentChickenCount + currentPorkCount > currentPassCount && (
                <span className="invalid-distribution">
                  {" "}
                  ✗ Excede el total de pases
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
                  ? t?.confirmation?.chickenCount || "Cantidad de Pollo"
                  : t?.confirmation?.chickenCountSingle || "Pollo"}
              </span>
              <select
                name="chickenCount"
                id="chickenCount"
                {...register("chickenCount", {
                  required: "Este campo es requerido",
                  validate: (value) => {
                    const chicken = parseInt(value) || 0;
                    const pork = currentPorkCount;
                    return (
                      chicken + pork === currentPassCount ||
                      "La suma debe ser igual al número de pases"
                    );
                  },
                })}
                disabled={isSubmitting}
                onChange={handleChickenChange}
              >
                <option value="">
                  {t?.confirmation?.selectOption || "Selecciona"}
                </option>
                {chickenCountOptions()}
              </select>
              {errors.chickenCount && (
                <span className="error">{errors.chickenCount.message}</span>
              )}
            </label>

            <label className="asistan-confirmation-label" htmlFor="porkCount">
              <span className="asistan-confirmation-label-text">
                {currentPassCount > 1
                  ? t?.confirmation?.porkCount || "Cantidad de Cerdo"
                  : t?.confirmation?.porkCountSingle || "Cerdo"}
              </span>
              <select
                name="porkCount"
                id="porkCount"
                {...register("porkCount", {
                  required: "Este campo es requerido",
                  validate: (value) => {
                    const pork = parseInt(value) || 0;
                    const chicken = currentChickenCount;
                    return (
                      chicken + pork === currentPassCount ||
                      "La suma debe ser igual al número de pases"
                    );
                  },
                })}
                disabled={isSubmitting}
                onChange={handlePorkChange}
              >
                <option value="">
                  {t?.confirmation?.selectOption || "Selecciona"}
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
            <button
              type="submit"
              className="button-confirmar-asistencia"
              disabled={isSubmitting || isSubmitted}
            >
              {t.confirmation.confirmAttendance}
            </button>
            <button
              type="button"
              className="button-no-asistir"
              onClick={handleNoAsistan}
              disabled={isSubmitting || isSubmitted}
            >
              {t.confirmation.willNotAttend}
            </button>
          </section>
        )}
      </form>

      <p>{t.confirmation.deadlineMessage}</p>
    </section>
  );
};

export default AsistanConfirmation;
