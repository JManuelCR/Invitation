import { useState, useEffect } from 'react';

export const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({});

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent;
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      setIsMobile(mobile);
      setIsTouch(touch);
      
      setDeviceInfo({
        userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
        orientation: window.orientation || 'unknown',
        platform: navigator.platform,
        language: navigator.language,
        memory: navigator.deviceMemory,
        cores: navigator.hardwareConcurrency
      });
    };

    detectDevice();

    // Escuchar cambios de orientación
    const handleOrientationChange = () => {
      setTimeout(detectDevice, 100); // Pequeño delay para que se actualice la orientación
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  return {
    isMobile,
    isTouch,
    deviceInfo,
    isLowEndDevice: deviceInfo.memory && deviceInfo.memory <= 2, // 2GB o menos
    isSmallScreen: deviceInfo.viewportWidth && deviceInfo.viewportWidth <= 480
  };
};
