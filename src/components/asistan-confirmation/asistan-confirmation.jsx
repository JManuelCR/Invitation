import "./asistan-confirmation.css";
import { useForm } from "react-hook-form";
import { useTranslation } from "../../hooks/useTranslation";
import { useState, useEffect, useMemo } from "react";
import { patchGuest } from "../../services/apdiPeopleService";
import { useData } from "../../context/useData";
import DebugPanel, { DebugToggle } from "./DebugPanel";
import ErrorBoundary from "./ErrorBoundary";
import MobileDebugger from "./MobileDebugger";
import GlobalErrorHandler from "./GlobalErrorHandler";
import ApiErrorDisplay from "../ApiErrorDisplay";
import { useMobileDetection } from "../../hooks/useMobileDetection";
import { useCacheBusting } from "../../hooks/useCacheBusting";

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
    updatePerson,
    loading,
    error,
    retryLoad
  } = useData();

  // Detectar dispositivo móvil
  const { isLowEndDevice } = useMobileDetection();

  // Manejo de caché
  const { cacheCleared, forceCacheClear } = useCacheBusting();

  // Estado para errores globales
  const [globalError, setGlobalError] = useState(null);

  // Función para manejar errores globales
  const handleGlobalError = (errorInfo) => {
    setGlobalError(errorInfo);
  };

  // Observar los valores del formulario
  const watchedValues = watch();

  // Obtener valores actuales
  const currentPassCount = parseInt(watchedValues.passCount) || 0;
  const currentChickenCount = parseInt(watchedValues.chickenCount) || 0;
  const currentPorkCount = parseInt(watchedValues.porkCount) || 0;

  // Generar opciones para chickenCount basadas en pases disponibles
  const chickenCountOptions = useMemo(() => {
    if (currentPassCount === 0) return [];

    const options = [];

    // Permitir elegir desde 0 hasta el total de pases
    for (let i = 0; i <= currentPassCount; i++) {
      options.push(
        <option key={i} value={i}>
          {i}{" "}
          {i === 1
            ? t?.confirmation?.chicken || "Pollo"
            : t?.confirmation?.chickenPlural || "Pollos"}
        </option>
      );
    }

    return options;
  }, [currentPassCount, t?.confirmation?.chicken, t?.confirmation?.chickenPlural]);

  // Generar opciones para porkCount basadas en pases disponibles
  const porkCountOptions = useMemo(() => {
    if (currentPassCount === 0) return [];

    const options = [];

    // Permitir elegir desde 0 hasta el total de pases
    for (let i = 0; i <= currentPassCount; i++) {
      options.push(
        <option key={i} value={i}>
          {i}{" "}
          {i === 1
            ? t?.confirmation?.pork || "Cerdo"
            : t?.confirmation?.porkPlural || "Cerdos"}
        </option>
      );
    }

    return options;
  }, [currentPassCount, t?.confirmation?.pork, t?.confirmation?.porkPlural]);

  // Inicializar valores del formulario cuando se carguen los datos de la persona
  useEffect(() => {
    if (person && person.passes) {
      // Inicializar valores del formulario
      setValue("passCount", person.passCount?.toString() || "");
      setValue("foodPreference", person.foodPreference || "");
      setValue("chickenCount", person.chickenCount?.toString() || "");
      setValue("porkCount", person.porkCount?.toString() || "");
      setValue("church", person.church || "");
      setValue("reception", person.reception || "");
    }
  }, [person, setValue]);

  // Resetear chickenCount y porkCount cuando cambie el número de pases
  useEffect(() => {
    if (currentPassCount === 0) {
      setValue("chickenCount", "");
      setValue("porkCount", "");
    }
  }, [currentPassCount, setValue]);

  // Auto-ajustar el otro campo cuando uno cambie para mantener la suma correcta
  // Solo se ejecuta cuando cambia el número de pases, no cuando cambian los valores de carne
  useEffect(() => {
    try {
      if (currentPassCount > 0) {
        // Si hay valores de carne seleccionados, verificar que sumen correctamente
        const totalSelected = currentChickenCount + currentPorkCount;
        if (totalSelected > currentPassCount) {
          // Si excede, solo resetear si ambos campos están llenos
          // Esto permite que el usuario seleccione 0 pollos sin forzar el cerdo
          if (currentChickenCount > 0 && currentPorkCount > 0) {
            setValue("chickenCount", "");
            setValue("porkCount", "");
          }
        }
      }
    } catch {
      // Error silencioso para evitar interrumpir la funcionalidad
    }
  }, [currentPassCount, currentChickenCount, currentPorkCount, setValue]);

  // Validación adicional para mostrar mensaje de ayuda
  const totalDishes = currentChickenCount + currentPorkCount;
  const isValidDishSelection = totalDishes === currentPassCount && currentPassCount > 0;
  const remainingDishes = currentPassCount - totalDishes;

  // Función para manejar el cambio de pollo
  const handleChickenChange = (e) => {
    try {
      const chickenValue = parseInt(e.target.value) || 0;
      
      // Actualizar el valor de pollo
      setValue("chickenCount", chickenValue.toString());

      // Auto-ajustar cerdo solo si hay pases seleccionados y el valor es válido
      if (currentPassCount > 0 && chickenValue >= 0 && chickenValue <= currentPassCount) {
        const remainingPork = currentPassCount - chickenValue;
        
        // Solo auto-ajustar si el cerdo actual excede el límite
        if (currentPorkCount > remainingPork) {
          // Usar setTimeout para evitar problemas de timing en móviles
          const delay = isLowEndDevice ? 1000 : 1000;
          
          setTimeout(() => {
            setValue("porkCount", remainingPork.toString());
          }, delay);
        }
      }
    } catch {
      // Error silencioso para evitar interrumpir la funcionalidad
      console.error(error);
    }
  };

  // Función para manejar el cambio de cerdo
  const handlePorkChange = (e) => {
    try {
      const porkValue = parseInt(e.target.value) || 0;
      
      // Actualizar el valor de cerdo
      setValue("porkCount", porkValue.toString());

      // Auto-ajustar pollo solo si hay pases seleccionados y el valor es válido
      if (currentPassCount > 0 && porkValue >= 0 && porkValue <= currentPassCount) {
        const remainingChicken = currentPassCount - porkValue;
        
        // Solo auto-ajustar si el pollo actual excede el límite
        if (currentChickenCount > remainingChicken) {
          // Usar setTimeout para evitar problemas de timing en móviles
          const delay = isLowEndDevice ? 1000 : 1000;
          
          setTimeout(() => {
            setValue("chickenCount", remainingChicken.toString());
          }, delay);
        }
      }
    } catch {
      // Error silencioso para evitar interrumpir la funcionalidad
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitMessage("");

      // Validar que tenemos los datos necesarios
      if (!person?.guestInvitationId) {
        throw new Error("ID de invitación no disponible");
      }

      const updateData = {
        guestParticipation: parseInt(data.passCount) || 0,
        guestChickenCountDesire: parseInt(data.chickenCount) || 0,
        guestPorkCountDesire: parseInt(data.porkCount) || 0,
        guestInvitationResponse: true,
        guestChurchAssistantConfirmation: data.churchAssistant === "true",
        guestReceptionAssistantConfirmation: data.receptionAssistant === "true",
        guestTransportCount: parseInt(data.foreignerTransport === "true" ? data.passCount : 0),
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
        if (typeof scrollToTravel === 'function') {
          scrollToTravel();
        }
      }, 500);
    } catch {
      // Error silencioso para evitar interrumpir la funcionalidad
      setSubmitMessage(`${t.confirmation.formErrorTryAgain || "Error al enviar. Intenta de nuevo."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNoAsistan = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setSubmitMessage("");

      // Validar que tenemos los datos necesarios
      if (!person?.guestInvitationId) {
        throw new Error("ID de invitación no disponible");
      }

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
        if (typeof scrollToTravel === 'function') {
          scrollToTravel();
        }
      }, 500);
    } catch {
      // Error silencioso para evitar interrumpir la funcionalidad
      setSubmitMessage(`${t.confirmation.errorDeclineConfirmationTryAgain || "Error al enviar. Intenta de nuevo."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mostrar error de API si existe
  if (error) {
    return (
      <ApiErrorDisplay 
        error={error} 
        onRetry={retryLoad}
        onClose={() => window.location.reload()}
      />
    );
  }

  // Mostrar loading si está cargando
  if (loading) {
    return (
      <section className="asistan-confirmation-container">
        <div className="dress-code-header header-alignment">
          <h2 className="dress-code-header-title">
            {t?.confirmation?.title || "Confirmación de Asistencia"}
          </h2>
          <hr />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px 20px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '32px',
            marginBottom: '20px',
            animation: 'spin 1s linear infinite'
          }}>🔄</div>
          <p>Cargando información del invitado...</p>
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </section>
    );
  }

  // Verificar que person existe antes de renderizar
  if (!person) {
    return (
      <section className="asistan-confirmation-container">
        <div className="dress-code-header header-alignment">
          <h2 className="dress-code-header-title">
            {t?.confirmation?.title || "Confirmación de Asistencia"}
          </h2>
          <hr />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px 20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>❌</div>
          <h3>No se pudo cargar la información del invitado</h3>
          <p>Por favor, verifica que el enlace sea correcto e intenta de nuevo.</p>
          <button
            onClick={retryLoad}
            style={{
              backgroundColor: '#00b894',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              marginTop: '20px'
            }}
          >
            🔄 Intentar de Nuevo
          </button>
        </div>
      </section>
    );
  }

  // No renderizar hasta que la caché esté limpia
  if (!cacheCleared) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ 
          fontSize: '32px', 
          marginBottom: '20px',
          animation: 'spin 1s linear infinite'
        }}>🔄</div>
        <div style={{ 
          fontSize: '16px', 
          color: '#666',
          textAlign: 'center',
          maxWidth: '300px'
        }}>
          Cargando la aplicación...
        </div>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <GlobalErrorHandler onError={handleGlobalError} />
      <DebugPanel 
        person={person}
        watchedValues={watchedValues}
        errors={errors}
        isSubmitting={isSubmitting}
        onForceCacheClear={forceCacheClear}
      />
      <MobileDebugger />
      
      {/* Mostrar error global si existe */}
      {globalError && (
        <div style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          right: '10px',
          background: 'rgba(255, 107, 107, 0.95)',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          zIndex: 10000,
          fontSize: '14px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>🚨 Error Global Detectado</strong>
              <div style={{ fontSize: '12px', marginTop: '5px' }}>
                {globalError.type}: {globalError.message || globalError.reason}
              </div>
            </div>
            <button
              onClick={() => setGlobalError(null)}
              style={{
                background: 'transparent',
                border: '1px solid white',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
      
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
        person?.guestInvitationResponse ? (
          <h2 className="asistan-confirmation-text">{t.confirmation.alreadyConfirmed}</h2>
        ) :(   <form
          className="asistan-confirmation-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="asistan-confirmation-title">
            {t.confirmation.confirmationMessageComplement}{" "}
            {person?.guestPassesNumberToRecibe || 0}{" "}
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
              style={{
                fontSize: '16px', // Previene zoom en iOS
                minHeight: '44px', // Tamaño mínimo táctil
                touchAction: 'manipulation' // Optimiza eventos táctiles
              }}
            >
              <option value="">{t.confirmation.selectPasses}</option>
              {Array.from(
                { length: person?.guestPassesNumberToRecibe || 0 },
                (_, index) => {
                  const value = (person?.guestPassesNumberToRecibe || 0) - index;
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
                        disabled={isSubmitting || person?.guestInvitationResponse}
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
              {person?.guestForeigner === "YES" &&
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
                        currentChickenCount === 1 ? "" : "s"
                      }`}
                    {currentChickenCount > 0 && currentPorkCount > 0 && " + "}
                    {currentPorkCount > 0 &&
                      ` ${currentPorkCount} ${t.confirmation.pork}${
                        currentPorkCount === 1 ? "" : "s"
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
                          try {
                            const chicken = parseInt(value) || 0;
                            const pork = currentPorkCount;
                            const total = chicken + pork;
                            
                            // Validar que la suma sea exactamente igual al número de pases
                            // Esto asegura que se asignen todos los pases seleccionados
                            const isValid = total === currentPassCount && total > 0;
                            return isValid || `${t.confirmation.dishesSum}`;
                          } catch {
                            // Error silencioso para evitar interrumpir la funcionalidad
                            return `${t.confirmation.dishesSum}`;
                          }
                        },
                      })}
                      disabled={isSubmitting}
                      onChange={(e) => {
                        try {
                          handleChickenChange(e);
                        } catch {
                          // Error silencioso para evitar interrumpir la funcionalidad
                        }
                      }}
                      style={{
                        fontSize: '16px', // Previene zoom en iOS
                        minHeight: '44px', // Tamaño mínimo táctil
                        touchAction: 'manipulation' // Optimiza eventos táctiles
                      }}
                    >
                      <option value="">
                        {t?.confirmation?.selectOption || ""}
                      </option>
                      {chickenCountOptions}
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
                          try {
                            const pork = parseInt(value) || 0;
                            const chicken = currentChickenCount;
                            const total = chicken + pork;
                            
                            // Validar que la suma sea exactamente igual al número de pases
                            // Esto asegura que se asignen todos los pases seleccionados
                            const isValid = total === currentPassCount && total > 0;
                            return isValid || `${t.confirmation.dishesSum}`;
                          } catch {
                            // Error silencioso para evitar interrumpir la funcionalidad
                            return `${t.confirmation.dishesSum}`;
                          }
                        },
                      })}
                      disabled={isSubmitting}
                      onChange={handlePorkChange}
                      style={{
                        fontSize: '16px', // Previene zoom en iOS
                        minHeight: '44px', // Tamaño mínimo táctil
                        touchAction: 'manipulation' // Optimiza eventos táctiles
                      }}
                    >
                      <option value="">
                        {t?.confirmation?.selectOption || ""}
                      </option>
                      {porkCountOptions}
                    </select>
                    {errors.porkCount && (
                      <span className="error">{errors.porkCount.message}</span>
                    )}
                  </label>
                  
                  {/* Mensaje de ayuda para la validación de platillos */}
                  {currentPassCount > 0 && (
                    <div style={{
                      marginTop: '10px',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      fontSize: '14px',
                      backgroundColor: isValidDishSelection ? '#d4edda' : '#fff3cd',
                      border: `1px solid ${isValidDishSelection ? '#c3e6cb' : '#ffeaa7'}`,
                      color: isValidDishSelection ? '#155724' : '#856404'
                    }}>
                      {isValidDishSelection ? (
                        <span>✅ {t?.confirmation?.dishesValid || "Platillos asignados correctamente"}</span>
                      ) : (
                        <span>
                          {remainingDishes > 0 
                            ? `⚠️ ${t?.confirmation?.dishesRemaining || "Faltan"} ${remainingDishes} ${t?.confirmation?.dishes || "platillos"} ${t?.confirmation?.toAssign || "por asignar"}`
                            : `⚠️ ${t?.confirmation?.dishesExceeded || "Has excedido el número de platillos disponibles"}`
                          }
                        </span>
                      )}
                    </div>
                  )}
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

      {/* <p>{t.confirmation.deadlineMessage}</p> */}
      
      <DebugToggle />
    </section>
    </ErrorBoundary>
  );
};

export default AsistanConfirmation;
