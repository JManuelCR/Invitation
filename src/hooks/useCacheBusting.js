import { useEffect, useState } from 'react';

export const useCacheBusting = () => {
  const [cacheCleared, setCacheCleared] = useState(false);

  useEffect(() => {
    const clearCache = async () => {
      try {
        console.log('🧹 Limpieza AGRESIVA de caché iniciada...');

        // Detectar tipo de dispositivo y navegador
        const userAgent = navigator.userAgent;
        const isIOS = /iPad|iPhone|iPod/.test(userAgent);
        const isAndroid = /Android/.test(userAgent);
        const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
        const isChrome = /Chrome/.test(userAgent);
        const isFirefox = /Firefox/.test(userAgent);

        console.log('📱 Dispositivo detectado:', {
          isIOS,
          isAndroid,
          isSafari,
          isChrome,
          isFirefox,
          userAgent
        });

        // Estrategias específicas por dispositivo
        const cleanupStrategies = [];

        // 1. LIMPIEZA AGRESIVA DE STORAGE
        if (typeof Storage !== 'undefined') {
          try {
            // Limpiar TODO el localStorage (más agresivo)
            localStorage.clear();
            sessionStorage.clear();
            console.log('✅ Storage completamente limpiado');
          } catch (e) {
            console.warn('⚠️ Error limpiando storage:', e);
          }
        }

        // 2. LIMPIEZA DE CACHÉ DE API
        if ('caches' in window) {
          cleanupStrategies.push(
            caches.keys().then(cacheNames => {
              console.log('🗑️ Eliminando cachés:', cacheNames);
              return Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
            })
          );
        }

        // 3. DESREGISTRAR SERVICE WORKERS Y LIMPIAR SU CACHÉ
        if ('serviceWorker' in navigator) {
          cleanupStrategies.push(
            navigator.serviceWorker.getRegistrations().then(registrations => {
              console.log('🔧 Desregistrando service workers:', registrations.length);
              return Promise.all(registrations.map(registration => registration.unregister()));
            })
          );
          
          // Limpiar caché del Service Worker activo
          if (navigator.serviceWorker.controller) {
            cleanupStrategies.push(
              new Promise((resolve) => {
                try {
                  const messageChannel = new MessageChannel();
                  messageChannel.port1.onmessage = (event) => {
                    console.log('✅ Service Worker caché limpiado:', event.data);
                    resolve();
                  };
                  
                  navigator.serviceWorker.controller.postMessage(
                    { type: 'CLEAR_CACHE' },
                    [messageChannel.port2]
                  );
                  
                  // Timeout de seguridad
                  setTimeout(() => {
                    console.log('⚠️ Timeout limpiando SW caché');
                    resolve();
                  }, 2000);
                } catch (error) {
                  console.warn('⚠️ Error comunicándose con Service Worker:', error);
                  resolve();
                }
              })
            );
          }
        }

        // 4. ESTRATEGIAS ESPECÍFICAS POR DISPOSITIVO
        if (isIOS && isSafari) {
          // Safari iOS es muy persistente con la caché
          cleanupStrategies.push(
            new Promise((resolve) => {
              // Forzar recarga de recursos críticos
              const criticalResources = [
                '/src/main.jsx',
                '/src/components/asistan-confirmation/asistan-confirmation.jsx',
                '/src/hooks/useTranslation.js'
              ];
              
              criticalResources.forEach(resource => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = `${resource}?v=${Date.now()}&bust=${Math.random()}`;
                link.as = 'script';
                document.head.appendChild(link);
              });
              
              setTimeout(resolve, 100);
            })
          );
        }

        if (isAndroid) {
          // Android puede necesitar limpieza adicional
          cleanupStrategies.push(
            new Promise((resolve) => {
              // Limpiar caché del navegador Android
              if (window.chrome && window.chrome.runtime) {
                try {
                  window.chrome.runtime.reload();
                } catch (e) {
                  console.warn('No se pudo recargar Chrome runtime');
                }
              }
              setTimeout(resolve, 50);
            })
          );
        }

        // 5. LIMPIEZA DE INDEXEDDB (si existe)
        if ('indexedDB' in window) {
          cleanupStrategies.push(
            new Promise((resolve) => {
              try {
                // Intentar limpiar IndexedDB
                const deleteReq = indexedDB.deleteDatabase('keyval-store');
                deleteReq.onsuccess = () => {
                  console.log('✅ IndexedDB limpiado');
                  resolve();
                };
                deleteReq.onerror = () => {
                  console.warn('⚠️ Error limpiando IndexedDB');
                  resolve();
                };
              } catch (e) {
                console.warn('⚠️ IndexedDB no disponible');
                resolve();
              }
            })
          );
        }

        // 6. FORZAR ACTUALIZACIÓN DE RECURSOS
        cleanupStrategies.push(
          new Promise((resolve) => {
            // Agregar timestamp a todos los scripts
            const scripts = document.querySelectorAll('script[src]');
            scripts.forEach(script => {
              if (script.src && !script.src.includes('?')) {
                script.src += `?v=${Date.now()}&bust=${Math.random()}`;
              }
            });
            
            // Agregar timestamp a todos los links de CSS
            const links = document.querySelectorAll('link[rel="stylesheet"]');
            links.forEach(link => {
              if (link.href && !link.href.includes('?')) {
                link.href += `?v=${Date.now()}&bust=${Math.random()}`;
              }
            });
            
            setTimeout(resolve, 100);
          })
        );

        // Ejecutar todas las estrategias
        await Promise.all(cleanupStrategies);

        // 7. MARCAR VERSIÓN Y VERIFICAR SI NECESITAMOS RECARGA
        const currentVersion = Date.now().toString();
        const lastVersion = localStorage.getItem('app-version');
        const forceReloadFlag = localStorage.getItem('force-reload');
        
        // Solo forzar recarga si no hemos recargado recientemente
        const shouldForceReload = forceReloadFlag === 'true' && 
          (!lastVersion || (Date.now() - parseInt(lastVersion)) > 60000); // 1 minuto mínimo entre recargas

        if (shouldForceReload) {
          console.log('🔄 Forzando recarga para asegurar versión fresca...');
          localStorage.setItem('app-version', currentVersion);
          localStorage.removeItem('force-reload'); // Limpiar flag para evitar bucle
          
          // Recargar la página después de un pequeño delay
          setTimeout(() => {
            window.location.reload(true);
          }, 100);
          return;
        }

        // Marcar versión y permitir que la app continúe
        localStorage.setItem('app-version', currentVersion);
        setCacheCleared(true);
        console.log('✅ Limpieza AGRESIVA completada - App lista para usar');

      } catch (error) {
        console.error('❌ Error durante la limpieza agresiva:', error);
        // Aún así, permitir que la app continúe
        setCacheCleared(true);
      }
    };

    // Verificar si necesitamos forzar recarga
    const forceReload = localStorage.getItem('force-reload') === 'true';
    if (forceReload) {
      console.log('🔄 Flag de recarga forzada detectado - limpiando y continuando...');
      localStorage.removeItem('force-reload');
      setCacheCleared(true);
      return;
    }

    // Hacer limpieza agresiva solo si es necesario
    const lastClean = localStorage.getItem('last-cache-clean');
    const now = Date.now();
    const needsCleanup = !lastClean || (now - parseInt(lastClean)) > 300000; // 5 minutos

    if (needsCleanup) {
      console.log('🧹 Limpieza necesaria - ejecutando...');
      localStorage.setItem('last-cache-clean', now.toString());
      clearCache();
    } else {
      console.log('✅ Caché reciente - saltando limpieza');
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
