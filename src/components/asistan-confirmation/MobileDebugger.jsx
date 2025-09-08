import React, { useState, useEffect } from 'react';

const MobileDebugger = () => {
  const [deviceInfo, setDeviceInfo] = useState({});
  const [touchEvents, setTouchEvents] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Detectar información del dispositivo
    const detectDevice = () => {
      const userAgent = navigator.userAgent;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      setDeviceInfo({
        userAgent,
        isMobile,
        isTouch,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
        orientation: window.orientation || 'unknown',
        platform: navigator.platform,
        language: navigator.language
      });
    };

    // Detectar eventos táctiles
    const handleTouchStart = (e) => {
      setTouchEvents(prev => [...prev.slice(-4), {
        type: 'touchstart',
        timestamp: Date.now(),
        touches: e.touches.length,
        target: e.target.tagName + (e.target.id ? `#${e.target.id}` : '') + (e.target.className ? `.${e.target.className.split(' ')[0]}` : '')
      }]);
    };

    const handleTouchEnd = (e) => {
      setTouchEvents(prev => [...prev.slice(-4), {
        type: 'touchend',
        timestamp: Date.now(),
        touches: e.touches.length,
        target: e.target.tagName + (e.target.id ? `#${e.target.id}` : '') + (e.target.className ? `.${e.target.className.split(' ')[0]}` : '')
      }]);
    };

    const handleClick = (e) => {
      setTouchEvents(prev => [...prev.slice(-4), {
        type: 'click',
        timestamp: Date.now(),
        target: e.target.tagName + (e.target.id ? `#${e.target.id}` : '') + (e.target.className ? `.${e.target.className.split(' ')[0]}` : '')
      }]);
    };

    detectDevice();

    // Agregar listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Solo mostrar en desarrollo y en dispositivos móviles
  if (import.meta.env.PROD || !deviceInfo.isMobile) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      background: 'rgba(0,0,0,0.9)',
      color: 'white',
      padding: '10px',
      borderRadius: '8px',
      fontSize: '10px',
      maxWidth: '300px',
      zIndex: 9999,
      fontFamily: 'monospace',
      maxHeight: '200px',
      overflow: 'auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h4 style={{ margin: 0, color: '#4CAF50' }}>📱 Mobile Debug</h4>
        <button
          onClick={() => setIsVisible(!isVisible)}
          style={{
            background: 'transparent',
            border: '1px solid #4CAF50',
            color: '#4CAF50',
            padding: '2px 6px',
            borderRadius: '3px',
            fontSize: '10px',
            cursor: 'pointer'
          }}
        >
          {isVisible ? '−' : '+'}
        </button>
      </div>

      {isVisible && (
        <>
          <div style={{ marginBottom: '10px' }}>
            <strong>Device:</strong>
            <div style={{ marginLeft: '10px' }}>
              <div>Mobile: {deviceInfo.isMobile ? '✅' : '❌'}</div>
              <div>Touch: {deviceInfo.isTouch ? '✅' : '❌'}</div>
              <div>Screen: {deviceInfo.screenWidth}x{deviceInfo.screenHeight}</div>
              <div>Viewport: {deviceInfo.viewportWidth}x{deviceInfo.viewportHeight}</div>
              <div>DPR: {deviceInfo.devicePixelRatio}</div>
              <div>Orientation: {deviceInfo.orientation}</div>
            </div>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <strong>Recent Events:</strong>
            <div style={{ marginLeft: '10px', maxHeight: '60px', overflow: 'auto' }}>
              {touchEvents.length > 0 ? (
                touchEvents.map((event, index) => (
                  <div key={index} style={{ 
                    color: event.type === 'touchstart' ? '#ff6b6b' : 
                           event.type === 'touchend' ? '#4CAF50' : '#ffd93d',
                    fontSize: '9px'
                  }}>
                    {event.type}: {event.target}
                  </div>
                ))
              ) : (
                <div style={{ color: '#666' }}>No events yet</div>
              )}
            </div>
          </div>

          <div>
            <strong>Performance:</strong>
            <div style={{ marginLeft: '10px' }}>
              <div>Memory: {navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'Unknown'}</div>
              <div>Cores: {navigator.hardwareConcurrency || 'Unknown'}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileDebugger;
