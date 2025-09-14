// Service Worker simplificado para control de caché
const CACHE_NAME = 'invitation-app-v2';
const DYNAMIC_CACHE_NAME = 'invitation-dynamic-v2';

// Archivos críticos que siempre deben estar en caché
const CRITICAL_FILES = [
  '/',
  '/index.html'
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

  // Estrategia: Network First para APIs
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

  // Estrategia: Network First para archivos estáticos (evitar problemas de caché)
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Solo cachear si la respuesta es exitosa
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
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
