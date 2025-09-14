import React from 'react';

const ApiErrorDisplay = ({ error, onRetry, onClose }) => {
  if (!error) return null;

  const getErrorMessage = (error) => {
    if (error.status === 404) {
      return 'No se encontró la invitación. Verifica que el enlace sea correcto.';
    }
    if (error.status === 500) {
      return 'Error del servidor. Intenta de nuevo en unos momentos.';
    }
    if (error.status === 0 || error.message?.includes('Network Error')) {
      return 'Error de conexión. Verifica tu internet e intenta de nuevo.';
    }
    if (error.message?.includes('timeout')) {
      return 'La petición tardó demasiado. Intenta de nuevo.';
    }
    return error.message || 'Error desconocido al cargar la invitación.';
  };

  const getErrorIcon = (error) => {
    if (error.status === 404) return '🔍';
    if (error.status === 500) return '⚠️';
    if (error.status === 0 || error.message?.includes('Network Error')) return '📡';
    if (error.message?.includes('timeout')) return '⏱️';
    return '❌';
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '20px'
        }}>
          {getErrorIcon(error)}
        </div>
        
        <h2 style={{
          color: '#d63031',
          margin: '0 0 15px 0',
          fontSize: '24px'
        }}>
          Error al Cargar la Invitación
        </h2>
        
        <p style={{
          color: '#2d3436',
          margin: '0 0 20px 0',
          fontSize: '16px',
          lineHeight: '1.5'
        }}>
          {getErrorMessage(error)}
        </p>

        {/* Información técnica para debugging */}
        {process.env.NODE_ENV === 'development' && (
          <details style={{
            margin: '20px 0',
            textAlign: 'left',
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '8px',
            fontSize: '12px'
          }}>
            <summary style={{
              cursor: 'pointer',
              fontWeight: 'bold',
              marginBottom: '10px'
            }}>
              🔧 Detalles Técnicos (Solo en Desarrollo)
            </summary>
            <div style={{ fontFamily: 'monospace' }}>
              <div><strong>Status:</strong> {error.status || 'N/A'}</div>
              <div><strong>Status Text:</strong> {error.statusText || 'N/A'}</div>
              <div><strong>Message:</strong> {error.message || 'N/A'}</div>
              {error.data && (
                <div><strong>Data:</strong> {JSON.stringify(error.data, null, 2)}</div>
              )}
            </div>
          </details>
        )}

        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {onRetry && (
            <button
              onClick={onRetry}
              style={{
                backgroundColor: '#00b894',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#00a085'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#00b894'}
            >
              🔄 Intentar de Nuevo
            </button>
          )}
          
          <button
            onClick={onClose || (() => window.location.reload())}
            style={{
              backgroundColor: '#6c5ce7',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#5f3dc4'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#6c5ce7'}
          >
            🔄 Recargar Página
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiErrorDisplay;
