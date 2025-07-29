import { useLocation } from 'react-router-dom'
import { DataProvider } from './context/DataProvider.jsx'
import App from './App.jsx'

// Componente wrapper para acceder a los parámetros de la URL
export default function AppWrapper() {
  const location = useLocation();
  
  // Extraer el guestId de la URL
  // Formato esperado: /invitacion/{guestId}
  const pathSegments = location.pathname.split('/');
  const guestId = pathSegments[1] === 'invitacion' && pathSegments[2] ? pathSegments[2] : null;
  
  return (
    <DataProvider guestId={guestId}>
      <App />
    </DataProvider>
  );
} 