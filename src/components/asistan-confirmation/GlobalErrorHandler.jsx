import { useEffect } from 'react';

const GlobalErrorHandler = ({ onError }) => {
  useEffect(() => {
    // Capturar errores de JavaScript no manejados
    const handleError = (event) => {
      const errorInfo = {
        type: 'JavaScript Error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        screenSize: `${window.screen.width}x${window.screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        memory: navigator.deviceMemory,
        url: window.location.href
      };

      console.error('🚨 Global JavaScript Error:', errorInfo);
      
      if (onError) {
        onError(errorInfo);
      }
    };

    // Capturar promesas rechazadas no manejadas
    const handleUnhandledRejection = (event) => {
      const errorInfo = {
        type: 'Unhandled Promise Rejection',
        reason: event.reason,
        promise: event.promise,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        screenSize: `${window.screen.width}x${window.screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        memory: navigator.deviceMemory,
        url: window.location.href
      };

      console.error('🚨 Unhandled Promise Rejection:', errorInfo);
      
      if (onError) {
        onError(errorInfo);
      }
    };

    // Agregar listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [onError]);

  return null; // Este componente no renderiza nada
};

export default GlobalErrorHandler;
