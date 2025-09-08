import React from 'react';

const DebugPanel = ({ person, watchedValues, errors, isSubmitting }) => {
  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      maxWidth: '300px',
      zIndex: 9999,
      fontFamily: 'monospace'
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

      <div>
        <strong>Status:</strong>
        <div style={{ marginLeft: '10px' }}>
          <div>Submitting: {isSubmitting ? '⏳' : '✅'}</div>
        </div>
      </div>
    </div>
  );
};

export default DebugPanel;
