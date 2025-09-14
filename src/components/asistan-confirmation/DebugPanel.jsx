import React from 'react';

const DebugPanel = ({ person, watchedValues, errors, isSubmitting, onForceCacheClear }) => {
  // Solo mostrar en desarrollo
  if (import.meta.env.PROD) {
    return null;
  }

  // Verificar si el debug está habilitado (solo para desarrolladores)
  const isDebugEnabled = localStorage.getItem('debug-enabled') === 'true' || 
                        window.location.search.includes('debug=true');

  if (!isDebugEnabled) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.9)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      maxWidth: '300px',
      zIndex: 9999,
      fontFamily: 'monospace',
      border: '1px solid #333',
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#4CAF50' }}>🐛 Debug Panel</h4>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Person Status:</strong>
        <div style={{ marginLeft: '10px' }}>
          <div>Exists: {person ? '✅' : '❌'}</div>
          {person && (
            <>
              <div>ID: {person.guestInvitationId || 'N/A'}</div>
              <div>Passes: {person.guestPassesNumberToRecibe || 0}</div>
              <div>Foreign: {person.guestForeigner || 'N/A'}</div>
              <div>Response: {person.guestInvitationResponse ? 'Yes' : 'No'}</div>
            </>
          )}
        </div>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>Form Values:</strong>
        <div style={{ marginLeft: '10px' }}>
          <div>Pass Count: {watchedValues.passCount || 'N/A'}</div>
          <div>Food Preference: {watchedValues.foodPreference || 'N/A'}</div>
          <div>Chicken: {watchedValues.chickenCount || 'N/A'}</div>
          <div>Pork: {watchedValues.porkCount || 'N/A'}</div>
          <div>Church: {watchedValues.churchAssistant || 'N/A'}</div>
          <div>Reception: {watchedValues.receptionAssistant || 'N/A'}</div>
          <div style={{ 
            color: (parseInt(watchedValues.chickenCount || 0) + parseInt(watchedValues.porkCount || 0)) === parseInt(watchedValues.passCount || 0) ? '#4CAF50' : '#ff6b6b',
            fontWeight: 'bold'
          }}>
            Sum: {(parseInt(watchedValues.chickenCount || 0) + parseInt(watchedValues.porkCount || 0))} / {watchedValues.passCount || 0}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>Form State:</strong>
        <div style={{ marginLeft: '10px' }}>
          <div>Is Valid: {Object.keys(errors).length === 0 ? '✅' : '❌'}</div>
          <div>Has Values: {Object.values(watchedValues).some(v => v && v !== '') ? '✅' : '❌'}</div>
          <div>Fields Count: {Object.keys(watchedValues).length}</div>
          <div>Raw Values: {JSON.stringify(watchedValues, null, 2)}</div>
        </div>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>Errors:</strong>
        <div style={{ marginLeft: '10px' }}>
          {Object.keys(errors).length > 0 ? (
            Object.entries(errors).map(([key, error]) => (
              <div key={key} style={{ color: '#ff6b6b' }}>
                {key}: {error.message}
              </div>
            ))
          ) : (
            <div style={{ color: '#4CAF50' }}>No errors</div>
          )}
        </div>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>Status:</strong>
        <div style={{ marginLeft: '10px' }}>
          <div>Submitting: {isSubmitting ? '⏳' : '✅'}</div>
        </div>
      </div>

      <div>
        <strong>Cache Control:</strong>
        <div style={{ marginLeft: '10px' }}>
          <button
            onClick={onForceCacheClear}
            style={{
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '10px',
              marginTop: '5px'
            }}
          >
            🧹 Force Clear Cache
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente para habilitar debug (solo visible en desarrollo)
const DebugToggle = () => {
  const [isDebugEnabled, setIsDebugEnabled] = React.useState(
    localStorage.getItem('debug-enabled') === 'true' || 
    window.location.search.includes('debug=true')
  );

  const toggleDebug = () => {
    const newValue = !isDebugEnabled;
    setIsDebugEnabled(newValue);
    localStorage.setItem('debug-enabled', newValue.toString());
    
    if (newValue) {
      console.log('🐛 Debug Panel habilitado');
    } else {
      console.log('🐛 Debug Panel deshabilitado');
    }
  };

  // Solo mostrar en desarrollo
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      zIndex: 10000
    }}>
      <button
        onClick={toggleDebug}
        style={{
          backgroundColor: isDebugEnabled ? '#4CAF50' : '#666',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '16px',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease'
        }}
        title={isDebugEnabled ? 'Deshabilitar Debug' : 'Habilitar Debug'}
      >
        {isDebugEnabled ? '🐛' : '🔧'}
      </button>
    </div>
  );
};

export default DebugPanel;
export { DebugToggle };
