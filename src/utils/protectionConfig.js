// Configuración de protección de imágenes
export const PROTECTION_CONFIG = {
  // Habilitar/deshabilitar diferentes tipos de protección
  enableRightClick: false,        // Bloquear clic derecho
  enableKeyboard: true,           // Bloquear teclas de descarga
  enableDrag: true,               // Bloquear arrastre
  enableSelection: true,          // Bloquear selección
  enableCopy: true,               // Bloquear copia
  enableInspect: true,            // Bloquear inspección
  enablePrintScreen: true,        // Bloquear Print Screen
  enableTouch: true,              // Bloquear eventos touch
  
  // Mensajes personalizados
  messages: {
    rightClick: 'Clic derecho deshabilitado',
    keyboard: 'Teclas de descarga bloqueadas',
    drag: 'Arrastre de imágenes bloqueado',
    selection: 'Selección de imágenes bloqueada',
    copy: 'Copia de imágenes bloqueada',
    inspect: 'Inspección de elementos bloqueada'
  },
  
  // Selectores de imágenes a proteger
  imageSelectors: [
    'img',
    'svg',
    '[style*="background-image"]',
    '[style*="background: url"]',
    '.image_ceremonia',
    '.image_recepcion',
    '.image_manu',
    '.image_tla',
    '.we-said-yes-slider-article-image',
    '.tips-and-tricks-slider-article-image',
    '.fathers-in-law-card',
    '.airport-instructions-maps-google',
    '.envelope__image',
    '.travel-image',
    '.dress-image',
    '.suit-image',
    '.bullet__icon'
  ],
  
  // Teclas bloqueadas
  blockedKeys: [
    'F12',
    'PrintScreen',
    'F13',
    's', // Ctrl+S
    'u', // Ctrl+U
    'c', // Ctrl+C
    'a', // Ctrl+A
    'I', // Ctrl+Shift+I
    'C', // Ctrl+Shift+C
    'J'  // Ctrl+Shift+J
  ],
  
  // Nivel de protección (1: básico, 2: medio, 3: alto)
  protectionLevel: 3,
  
  // Mostrar mensajes en consola
  debugMode: false,
  
  // Habilitar protección automática
  autoProtect: true,
  
  // Intervalo de verificación (ms)
  checkInterval: 5000
};

// Función para obtener configuración personalizada
export function getProtectionConfig(customConfig = {}) {
  return { ...PROTECTION_CONFIG, ...customConfig };
}

// Función para validar configuración
export function validateConfig(config) {
  const required = ['enableRightClick', 'enableKeyboard', 'enableDrag'];
  const missing = required.filter(key => !(key in config));
  
  if (missing.length > 0) {
    console.warn('Configuración de protección incompleta:', missing);
    return false;
  }
  
  return true;
}

