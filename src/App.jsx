import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Invitation from './components/invitation/invitation'

function App() {
  // Asegurar que siempre comience al inicio solo una vez
  useEffect(() => {
    // Posicionar al inicio inmediatamente solo al cargar
    window.scrollTo(0, 0);
  }, []); // Solo se ejecuta una vez al montar

  return (
    <>
      <Routes>
        <Route path="/" element={<Invitation />} />
        <Route path="/envelope" element={<Invitation />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </>
  )
}

export default App
