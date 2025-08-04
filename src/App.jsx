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
  // Extraer el guestId de los query parameters
  const urlParams = new URLSearchParams(location.search);
  const guestId = urlParams.get('invitation');
  return (
    <DataProvider guestId={guestId}>
      <AppContent />
    </DataProvider>
  );
}

export default App
