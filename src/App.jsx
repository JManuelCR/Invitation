import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Invitation from './components/invitation/invitation';
import { DataProvider } from './context/DataProvider.jsx';
import { protectImages } from './utils/imageProtection';

function AppContent() {
  // Asegurar que siempre comience al inicio solo una vez
  useEffect(() => {
    // Posicionar al inicio inmediatamente solo al cargar
    window.scrollTo(0, 0);
    
    // Activar protección de imágenes al cargar la aplicación
    protectImages();
  }, []); // Solo se ejecuta una vez al montar

  return (
    <Routes>
      <Route path="/" element={<Invitation />} />
      <Route path="/envelope" element={<Invitation />} />
      <Route path="/invitation/:guestId" element={<Invitation />} />
      <Route path="*" element={<div>invitation</div>} />
    </Routes>
  );
}

function App() {
  const location = useLocation();
  // Extraer el guestId de los query parameters
  const urlParams = new URLSearchParams(location.search);
  const guestId = urlParams.get('invitation');
  
  return (
    <DataProvider guestId={guestId}>
      <AppContent />
    </DataProvider>
  );
}

export default App;
