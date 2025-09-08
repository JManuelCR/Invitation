import { useEffect, useState } from 'react';

export const useCacheBusting = () => {
  const [cacheCleared, setCacheCleared] = useState(false);

  useEffect(() => {
    const clearCache = async () => {
      try {
        console.log('🧹 Limpieza automática de caché...');

        // Limpiar caché de forma rápida y eficiente
        const cleanupPromises = [];

        // 1. Limpiar localStorage y sessionStorage (solo datos de caché, no configuración del usuario)
        if (typeof Storage !== 'undefined') {
          // Solo limpiar claves relacionadas con caché, no toda la configuración
          const keysToRemove = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key.includes('cache') || key.includes('version') || key.includes('sw-'))) {
              keysToRemove.push(key);
            }
          }
          keysToRemove.forEach(key => localStorage.removeItem(key));
          sessionStorage.clear();
        }

        // 2. Limpiar caché de la API Cache si está disponible
        if ('caches' in window) {
          cleanupPromises.push(
            caches.keys().then(cacheNames => 
              Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)))
            )
          );
        }

        // 3. Desregistrar service workers antiguos
        if ('serviceWorker' in navigator) {
          cleanupPromises.push(
            navigator.serviceWorker.getRegistrations().then(registrations =>
              Promise.all(registrations.map(registration => registration.unregister()))
            )
          );
        }

        // Ejecutar todas las limpiezas en paralelo
        await Promise.all(cleanupPromises);

        // Actualizar versión de la app
        localStorage.setItem('app-version', import.meta.env.VITE_APP_VERSION || Date.now().toString());
        localStorage.removeItem('force-cache-clear');

        setCacheCleared(true);
        console.log('✅ Limpieza automática completada');

      } catch (error) {
        console.error('❌ Error durante la limpieza automática:', error);
        // Aún así, permitir que la app continúe
        setCacheCleared(true);
      }
    };

    // Siempre hacer limpieza automática
    clearCache();
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
