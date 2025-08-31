import { useLocation } from 'react-router-dom'
import { DataProvider } from './context/DataProvider.jsx'
import AppContent from './App.jsx'

// Componente wrapper para acceder a los parámetros de la URL
export default function AppWrapper() {
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const guestId = queryParams.get('invitation');
  
  return (
    <DataProvider guestId={guestId}>
      <AppContent />
    </DataProvider>
  );
} 