import { useEffect, useState } from 'react';

const CacheBuster = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const aggressiveCacheClear = async () => {
      try {
        console.log('🚀 CacheBuster: Iniciando limpieza ULTRA AGRESIVA...');

        // 1. Limpiar TODOS los storages inmediatamente
        try {
          localStorage.clear();
          sessionStorage.clear();
          console.log('✅ Storages limpiados');
        } catch (e) {
          console.warn('⚠️ Error limpiando storages:', e);
        }

        // 2. Limpiar caché de API
        if ('caches' in window) {
          try {
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.map(name => caches.delete(name)));
            console.log('✅ Caché de API limpiado');
          } catch (e) {
            console.warn('⚠️ Error limpiando caché de API:', e);
          }
        }

        // 3. Desregistrar service workers
        if ('serviceWorker' in navigator) {
          try {
            const registrations = await navigator.serviceWorker.getRegistrations();
            await Promise.all(registrations.map(reg => reg.unregister()));
            console.log('✅ Service Workers desregistrados');
          } catch (e) {
            console.warn('⚠️ Error desregistrando service workers:', e);
          }
        }

        // 4. Forzar recarga de recursos con timestamps únicos
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(7);
        
        // Agregar parámetros de cache busting a todos los recursos
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
          if (script.src) {
            const url = new URL(script.src);
            url.searchParams.set('v', timestamp);
            url.searchParams.set('bust', random);
            script.src = url.toString();
          }
        });

        const links = document.querySelectorAll('link[href]');
        links.forEach(link => {
          if (link.href) {
            const url = new URL(link.href);
            url.searchParams.set('v', timestamp);
            url.searchParams.set('bust', random);
            link.href = url.toString();
          }
        });

        // 5. Detectar dispositivo y aplicar estrategias específicas
        const userAgent = navigator.userAgent;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        
        if (isMobile) {
          console.log('📱 Dispositivo móvil detectado - aplicando estrategias específicas');
          
          // Para móviles, forzar recarga más agresiva
          const forceReload = localStorage.getItem('force-reload-mobile');
          if (!forceReload) {
            localStorage.setItem('force-reload-mobile', 'true');
            console.log('🔄 Forzando recarga en móvil...');
            setTimeout(() => {
              window.location.reload(true);
            }, 50);
            return;
          } else {
            localStorage.removeItem('force-reload-mobile');
          }
        }

        // 6. Marcar como listo
        localStorage.setItem('cache-buster-ready', timestamp.toString());
        setIsReady(true);
        console.log('✅ CacheBuster: Limpieza completada');

      } catch (error) {
        console.error('❌ Error en CacheBuster:', error);
        // Aún así, permitir que la app continúe
        setIsReady(true);
      }
    };

    // Ejecutar inmediatamente
    aggressiveCacheClear();
  }, []);

  // Mostrar pantalla de carga mientras se limpia la caché
  if (!isReady) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#f8f9fa',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '20px',
          animation: 'pulse 1.5s ease-in-out infinite'
        }}>
          🧹
        </div>
        <div style={{
          fontSize: '18px',
          color: '#666',
          textAlign: 'center',
          maxWidth: '300px'
        }}>
          Optimizando la aplicación...
        </div>
        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
          }
        `}</style>
      </div>
    );
  }

  return children;
};

export default CacheBuster;
