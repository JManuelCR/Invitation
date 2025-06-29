import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Invitation from './components/invitation/invitation'

function App() {
  // Asegurar que siempre comience al inicio
  useEffect(() => {
    // Posicionar al inicio inmediatamente
    window.scrollTo(0, 0);
    
    // Posicionar al inicio cuando se hace reload
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

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
