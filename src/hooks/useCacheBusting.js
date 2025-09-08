import { useEffect, useState } from 'react';

export const useCacheBusting = () => {
  const [cacheCleared, setCacheCleared] = useState(false);

  useEffect(() => {
    const clearCache = async () => {
      try {
        console.log('🧹 Iniciando limpieza de caché...');

        // 1. Limpiar localStorage y sessionStorage
        if (typeof Storage !== 'undefined') {
          localStorage.clear();
          sessionStorage.clear();
          console.log('✅ localStorage y sessionStorage limpiados');
        }

        // 2. Limpiar caché del service worker si existe
        if ('serviceWorker' in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (let registration of registrations) {
            await registration.unregister();
            console.log('✅ Service Worker desregistrado:', registration.scope);
          }
        }

        // 3. Limpiar caché de la API Cache si está disponible
        if ('caches' in window) {
          const cacheNames = await caches.keys();
          await Promise.all(
            cacheNames.map(cacheName => {
              console.log('🗑️ Eliminando caché:', cacheName);
              return caches.delete(cacheName);
            })
          );
          console.log('✅ Caché de API limpiado');
        }

        // 4. Forzar recarga de recursos críticos
        const criticalResources = [
          '/src/components/asistan-confirmation/asistan-confirmation.jsx',
          '/src/components/asistan-confirmation/ErrorBoundary.jsx',
          '/src/hooks/useTranslation.js',
          '/src/context/DataProvider.jsx'
        ];

        criticalResources.forEach(resource => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = `${resource}?v=${Date.now()}`;
          link.as = 'script';
          document.head.appendChild(link);
        });

        setCacheCleared(true);
        console.log('🎉 Limpieza de caché completada');

      } catch (error) {
        console.error('❌ Error durante la limpieza de caché:', error);
      }
    };

    // Solo limpiar caché en desarrollo o cuando se detecte un problema
    const shouldClearCache = 
      import.meta.env.DEV || 
      localStorage.getItem('force-cache-clear') === 'true' ||
      !localStorage.getItem('app-version') ||
      localStorage.getItem('app-version') !== import.meta.env.VITE_APP_VERSION;

    if (shouldClearCache) {
      clearCache();
      localStorage.setItem('app-version', import.meta.env.VITE_APP_VERSION || Date.now().toString());
      localStorage.removeItem('force-cache-clear');
    } else {
      setCacheCleared(true);
    }
  }, []);

  const forceCacheClear = () => {
    localStorage.setItem('force-cache-clear', 'true');
    window.location.reload();
  };

  return {
    cacheCleared,
    forceCacheClear
  };
};
