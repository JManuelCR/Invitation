import React, { useState, useEffect } from 'react';

const CacheBustingNotification = ({ onCacheCleared }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    // Mostrar notificación si se detecta que necesita limpiar caché
    const needsCacheClear = 
      localStorage.getItem('force-cache-clear') === 'true' ||
      !localStorage.getItem('app-version') ||
      localStorage.getItem('app-version') !== import.meta.env.VITE_APP_VERSION;

    if (needsCacheClear) {
      setShowNotification(true);
    }
  }, []);

  const handleClearCache = async () => {
    setIsClearing(true);
    
    try {
      // Limpiar caché del navegador
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }

      // Limpiar storage
      localStorage.clear();
      sessionStorage.clear();

      // Desregistrar service workers
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(
          registrations.map(registration => registration.unregister())
        );
      }

      // Recargar la página
      window.location.reload();
    } catch (error) {
      console.error('Error al limpiar caché:', error);
      setIsClearing(false);
    }
  };

  if (!showNotification) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '15px',
      zIndex: 10000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
          🔄 Actualización Disponible
        </h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', opacity: 0.9 }}>
          Se ha detectado una nueva versión de la aplicación. 
          Para asegurar el mejor funcionamiento, se recomienda limpiar la caché.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleClearCache}
            disabled={isClearing}
            style={{
              backgroundColor: isClearing ? '#ccc' : '#00b894',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: isClearing ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
          >
            {isClearing ? '⏳ Limpiando...' : '🧹 Limpiar Caché y Recargar'}
          </button>
          <button
            onClick={() => setShowNotification(false)}
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: '1px solid white',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Continuar Sin Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CacheBustingNotification;
