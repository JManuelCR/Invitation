import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Invitation from './components/invitation/invitation'
import { DataProvider } from './context/DataProvider.jsx'

function AppContent() {
  // Asegurar que siempre comience al inicio solo una vez
  useEffect(() => {
    // Posicionar al inicio inmediatamente solo al cargar
    window.scrollTo(0, 0);
  }, []); // Solo se ejecuta una vez al montar

  return (
    <Routes>
      <Route path="/" element={<Invitation />} />
      <Route path="/envelope" element={<Invitation />} />
      <Route path="/invitation/:guestId" element={<Invitation />} />
      <Route path="*" element={<div>invitation</div>} />
    </Routes>
  )
}

function App() {
  const location = useLocation();
  
  // Extraer el guestId de la URL
  const pathSegments = location.pathname.split('/');
  const guestId = pathSegments[1] === 'invitation' && !!pathSegments[2] ? pathSegments[2] : null;
  return (
    <DataProvider guestId={guestId}>
      <AppContent />
    </DataProvider>
  );
}

export default App
