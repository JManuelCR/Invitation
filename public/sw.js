// Service Worker para control de caché
const CACHE_NAME = 'invitation-app-v1';
const DYNAMIC_CACHE_NAME = 'invitation-dynamic-v1';

// Archivos críticos que siempre deben estar en caché
const CRITICAL_FILES = [
  '/',
  '/index.html',
  '/src/components/asistan-confirmation/asistan-confirmation.jsx',
  '/src/components/asistan-confirmation/ErrorBoundary.jsx',
  '/src/hooks/useTranslation.js',
  '/src/context/DataProvider.jsx'
];

// Instalar service worker
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker instalando...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Cacheando archivos críticos...');
        return cache.addAll(CRITICAL_FILES);
      })
      .then(() => {
        console.log('✅ Service Worker instalado correctamente');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Error instalando Service Worker:', error);
      })
  );
});

// Activar service worker
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activando...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Eliminar cachés antiguos
            if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('🗑️ Eliminando caché antiguo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker activado');
        return self.clients.claim();
      })
  );
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo interceptar requests de la misma origen
  if (url.origin !== location.origin) {
    return;
  }

  // Estrategia: Network First para archivos dinámicos
  if (request.url.includes('/api/') || request.url.includes('.json')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Si la respuesta es exitosa, actualizar caché
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          // Si falla la red, intentar desde caché
          return caches.match(request);
        })
    );
    return;
  }

  // Estrategia: Cache First para archivos estáticos
  if (request.url.includes('.js') || request.url.includes('.css') || request.url.includes('.jsx')) {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            // Verificar si el archivo está actualizado
            const cacheTime = response.headers.get('sw-cache-time');
            const now = Date.now();
            
            // Si el archivo tiene más de 5 minutos en caché, intentar actualizar
            if (!cacheTime || (now - parseInt(cacheTime)) > 300000) {
              fetch(request)
                .then((networkResponse) => {
                  if (networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    responseClone.headers.set('sw-cache-time', now.toString());
                    caches.open(CACHE_NAME)
                      .then((cache) => {
                        cache.put(request, responseClone);
                      });
                  }
                })
                .catch(() => {
                  // Si falla la actualización, usar caché existente
                });
            }
            
            return response;
          }
          
          // Si no está en caché, hacer fetch y cachear
          return fetch(request)
            .then((response) => {
              if (response.status === 200) {
                const responseClone = response.clone();
                responseClone.headers.set('sw-cache-time', Date.now().toString());
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  });
              }
              return response;
            });
        })
    );
    return;
  }

  // Para otros requests, usar estrategia por defecto
  event.respondWith(
    fetch(request)
      .catch(() => caches.match(request))
  );
});

// Mensaje para limpiar caché
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('🧹 Limpiando caché por solicitud...');
    
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log('🗑️ Eliminando caché:', cacheName);
            return caches.delete(cacheName);
          })
        );
      })
      .then(() => {
        console.log('✅ Caché limpiado');
        event.ports[0].postMessage({ success: true });
      })
      .catch((error) => {
        console.error('❌ Error limpiando caché:', error);
        event.ports[0].postMessage({ success: false, error: error.message });
      });
  }
});
