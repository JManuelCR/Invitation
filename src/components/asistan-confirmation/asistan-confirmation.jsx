import './asistan-confirmation.css';
import { useForm } from "react-hook-form";
import { useTranslation } from '../../hooks/useTranslation';
import { useState } from 'react';
import { patchGuest } from '../../services/apdiPeopleService';

const AsistanConfirmation = ({ totalPasses = 4, guestId }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Debug: Ver qué valores tiene el formulario
  const watchedValues = watch();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitMessage('');
      console.log("=== FORMULARIO ENVIADO ===");
      console.log("Guest ID:", guestId);
      console.log("Datos del formulario:", data);
      
      // Mapear los datos del formulario a los campos del backend
      const updateData = {
        guestPassesNumberToRecibe: parseInt(data.passCount),
        guestFoodPreference: data.foodPreference
      };
      
      console.log("Datos a enviar al backend:", updateData);
      
      await patchGuest(guestId, updateData);
        
      setSubmitMessage('¡Confirmación enviada exitosamente!');
      console.log("Formulario enviado correctamente");
      
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSubmitMessage('Error al enviar la confirmación. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNoAsistan = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setSubmitMessage('');
      console.log("=== DECLINANDO ASISTENCIA ===");
      console.log("Guest ID:", guestId);
      
      await patchGuest(guestId, {
        guestPassesNumberToRecibe: 0,
        guestFoodPreference: 'No asistiré'
      });
      
      setSubmitMessage('Gracias por tu respuesta. Lamentamos que no puedas asistir.');
      
    } catch (error) {
      console.error("Error al declinar asistencia:", error);
      setSubmitMessage('Error al procesar tu respuesta. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Debug: Verificar datos
  console.log("=== DEBUG INFO ===");
  console.log("Guest ID recibido:", guestId);
  console.log("Total passes:", totalPasses);
  console.log("Valores del formulario:", watchedValues);

  return (
    <section className="asistan-confirmation-container">
      <div className="dress-code-header">
        <h2 className="dress-code-header-title">
          {t?.confirmation?.title || 'Confirmación de Asistencia'}
        </h2>
        <hr />
      </div>
      
      <p className="asistan-confirmation-text">
        "Lo más importante para nosotros es compartir este momento contigo.
        Sabemos que es una fecha complicada, por eso te agradeceríamos mucho
        confirmar tu asistencia. Queremos organizar todo con cariño y medida,
        pensando en cada uno de ustedes."
      </p>
      
      {submitMessage && (
        <div className={`submit-message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>
          {submitMessage}
        </div>
      )}
      
      <form 
        className="asistan-confirmation-form" 
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="asistan-confirmation-title">
          Tienes {totalPasses} pases para ti y tu familia
        </h3>
        
        <label className="asistan-confirmation-label" htmlFor="passCount">
          <span className="asistan-confirmation-label-text">Pases a utilizar:</span>
          <select 
            name="passCount" 
            id="passCount" 
            {...register("passCount", { 
              required: "Este campo es requerido",
              validate: value => value !== "" || "Selecciona un número de pases"
            })}
            disabled={isSubmitting}
          >
            <option value="">Selecciona pases</option>
            {Array.from({ length: totalPasses }, (_, index) => {
              const value = totalPasses - index;
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              );
            })}
          </select>
          {errors.passCount && <span className="error">{errors.passCount.message}</span>}
        </label>

        <span className="asistan-confirmation-label-text">
          No nos gustaría desperdiciar alimentos, por favor, indica que prefieres comer:
        </span>
        
        <label className="asistan-confirmation-label" htmlFor="foodPreference">
          <span className="asistan-confirmation-label-text">Preferencia:</span>
          <select 
            name="foodPreference" 
            id="foodPreference" 
            {...register("foodPreference", { 
              required: "Este campo es requerido",
              validate: value => value !== "" || "Selecciona una preferencia"
            })}
            disabled={isSubmitting}
          >
            <option value="">Selecciona una opción</option>
            <option value="Pollo">Pollo</option>
            <option value="Cerdo">Cerdo</option>
          </select>
          {errors.foodPreference && <span className="error">{errors.foodPreference.message}</span>}
        </label>

        {
          isSubmitting ? (
            <p>Enviando...</p>
          ) : (
            <section className="button-container">
            <button 
              type="submit" 
              className="button-confirmar-asistencia"
              disabled={isSubmitting}
            >
              Confirmar asistencia
            </button>
            <button 
              type="button" 
              className="button-no-asistir" 
              onClick={handleNoAsistan}
              disabled={isSubmitting}
            >
              No asistiré
            </button>
          </section>
          )
        }
      </form>
      
      <p>
        Por favor, confirma tu asistencia antes de Octubre 15.
      </p>
    </section>
  );
};

export default AsistanConfirmation;
