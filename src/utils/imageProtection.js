// Protección de imágenes contra descarga
export function protectImages() {
  // Bloquear clic derecho en toda la página
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });

  // Bloquear teclas de descarga y herramientas de desarrollador
  document.addEventListener('keydown', function(e) {
    if (
      (e.ctrlKey && e.key === 's') || // Ctrl+S
      (e.ctrlKey && e.key === 'u') || // Ctrl+U
      (e.key === 'F12') || // F12
      (e.ctrlKey && e.shiftKey && e.key === 'I') || // Ctrl+Shift+I
      (e.ctrlKey && e.shiftKey && e.key === 'C') || // Ctrl+Shift+C
      (e.ctrlKey && e.shiftKey && e.key === 'J') || // Ctrl+Shift+J
      (e.ctrlKey && e.key === 'c') || // Ctrl+C
      (e.ctrlKey && e.key === 'a') // Ctrl+A
    ) {
      e.preventDefault();
      return false;
    }
  });

  // Bloquear arrastre de imágenes
  document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'SVG') {
      e.preventDefault();
      return false;
    }
  });

  // Bloquear selección de texto e imágenes
  document.addEventListener('selectstart', function(e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'SVG') {
      e.preventDefault();
      return false;
    }
  });

  // Bloquear copia de imágenes
  document.addEventListener('copy', function(e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'SVG') {
      e.preventDefault();
      return false;
    }
  });

  // Bloquear inspección de elementos
  document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
      e.preventDefault();
      return false;
    }
  });

  // Bloquear captura de pantalla (Print Screen)
  document.addEventListener('keydown', function(e) {
    if (e.key === 'PrintScreen' || e.key === 'F13') {
      e.preventDefault();
      return false;
    }
  });

  // Bloquear eventos de mouse en imágenes
  document.addEventListener('mousedown', function(e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'SVG') {
      if (e.button === 1 || e.button === 2) { // Botón medio o derecho
        e.preventDefault();
        return false;
      }
    }
  });

  // Bloquear eventos de touch en imágenes
  document.addEventListener('touchstart', function(e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'SVG') {
      e.preventDefault();
      return false;
    }
  }, { passive: false });

  // Mensaje de advertencia
  console.log('🛡️ Protección de imágenes activada');
  
  // Aplicar protección CSS a todas las imágenes existentes
  setTimeout(() => {
    disableImageDownload();
  }, 1000);
}

// Función para aplicar protección solo a imágenes específicas
export function protectSpecificImages(selector) {
  const images = document.querySelectorAll(selector);
  
  images.forEach(img => {
    // Aplicar CSS de protección
    img.style.userSelect = 'none';
    img.style.webkitUserSelect = 'none';
    img.style.mozUserSelect = 'none';
    img.style.msUserSelect = 'none';
    img.style.webkitUserDrag = 'none';
    img.style.khtmlUserDrag = 'none';
    img.style.mozUserDrag = 'none';
    img.style.oUserDrag = 'none';
    img.style.userDrag = 'none';
    img.style.pointerEvents = 'none';
    
    // Prevenir eventos de descarga
    img.addEventListener('contextmenu', e => e.preventDefault());
    img.addEventListener('dragstart', e => e.preventDefault());
    img.addEventListener('selectstart', e => e.preventDefault());
    img.addEventListener('mousedown', e => {
      if (e.button === 1 || e.button === 2) {
        e.preventDefault();
        return false;
      }
    });
  });
}

// Función para deshabilitar completamente la descarga
export function disableImageDownload() {
  // Bloquear todas las imágenes
  const allImages = document.querySelectorAll('img');
  
  allImages.forEach(img => {
    // Remover atributos que facilitan la descarga
    img.removeAttribute('download');
    
    // Agregar atributos de protección
    img.setAttribute('draggable', 'false');
    img.setAttribute('unselectable', 'on');
    
    // Aplicar estilos de protección
    Object.assign(img.style, {
      userSelect: 'none',
      webkitUserSelect: 'none',
      mozUserSelect: 'none',
      msUserSelect: 'none',
      webkitUserDrag: 'none',
      khtmlUserDrag: 'none',
      mozUserDrag: 'none',
      oUserDrag: 'none',
      userDrag: 'none',
      pointerEvents: 'none'
    });
  });

  // Bloquear todos los SVGs
  const allSVGs = document.querySelectorAll('svg');
  allSVGs.forEach(svg => {
    svg.setAttribute('draggable', 'false');
    svg.setAttribute('unselectable', 'on');
    Object.assign(svg.style, {
      userSelect: 'none',
      webkitUserSelect: 'none',
      mozUserSelect: 'none',
      msUserSelect: 'none',
      pointerEvents: 'none'
    });
  });
}
