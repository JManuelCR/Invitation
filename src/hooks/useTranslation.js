import { useData } from '../context/useData';
import { translations } from '../translations';

export const useTranslation = () => {
  const { person } = useData();
  
  // Determinar el idioma basado en person.guestLanguage
  const getLanguage = () => {
    if (!person || !person.guestLanguage) {
      return 'es'; // Español por defecto
    }
    
    // Normalizar el idioma (puede venir como "Ingles", "English", "en", etc.)
    const language = person.guestLanguage.toLowerCase();
    
    if (language.includes('ingl') || language.includes('english') || language === 'en') {
      return 'en';
    }
    
    return 'es'; // Español por defecto
  };
  
  const currentLanguage = getLanguage();
  const t = translations[currentLanguage];
  
  // Función helper para obtener traducciones anidadas
  const translate = (key) => {
    const keys = key.split('.');
    let result = t;
    
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Retorna la clave si no encuentra la traducción
      }
    }
    
    return result;
  };
  
  return {
    t,
    translate,
    currentLanguage,
    isEnglish: currentLanguage === 'en',
    isSpanish: currentLanguage === 'es'
  };
}; 