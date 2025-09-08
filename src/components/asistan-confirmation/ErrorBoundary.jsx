import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    // Actualiza el state para mostrar la UI de error
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log detallado del error para debugging
    console.error('🚨 ErrorBoundary caught an error:', {
      error: error,
      errorInfo: errorInfo,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      screenSize: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      memory: navigator.deviceMemory,
      url: window.location.href
    });
    
    this.setState({
      error: error,
      errorInfo: errorInfo,
      timestamp: new Date().toISOString(),
      deviceInfo: {
        userAgent: navigator.userAgent,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        screenSize: `${window.screen.width}x${window.screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        memory: navigator.deviceMemory,
        url: window.location.href
      }
    });
  }

  render() {
    if (this.state.hasError) {
      // UI de error personalizada
      return (
        <div style={{
          padding: '20px',
          border: '2px solid #ff6b6b',
          borderRadius: '8px',
          backgroundColor: '#ffe0e0',
          margin: '20px',
          fontFamily: 'Arial, sans-serif',
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}>
          <h2 style={{ color: '#d63031', margin: '0 0 10px 0' }}>
            🚨 Error en el Formulario
          </h2>
          <p style={{ color: '#2d3436', margin: '0 0 15px 0' }}>
            Ha ocurrido un error inesperado. Por favor, recarga la página.
          </p>
          
          {/* Información del dispositivo */}
          {this.state.deviceInfo && (
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '10px', 
              borderRadius: '4px', 
              marginBottom: '15px',
              fontSize: '12px'
            }}>
              <strong>Información del Dispositivo:</strong>
              <div>Móvil: {this.state.deviceInfo.isMobile ? '✅' : '❌'}</div>
              <div>Pantalla: {this.state.deviceInfo.screenSize}</div>
              <div>Vista: {this.state.deviceInfo.viewportSize}</div>
              <div>Memoria: {this.state.deviceInfo.memory ? `${this.state.deviceInfo.memory}GB` : 'Desconocida'}</div>
              <div>Hora: {this.state.timestamp}</div>
            </div>
          )}
          
          <details style={{ marginTop: '15px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              🔍 Detalles del Error
            </summary>
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '10px',
              borderRadius: '4px',
              marginTop: '10px',
              fontSize: '12px',
              maxHeight: '200px',
              overflow: 'auto'
            }}>
              <div style={{ marginBottom: '10px' }}>
                <strong>Error:</strong>
                <div style={{ color: '#d63031', fontFamily: 'monospace' }}>
                  {this.state.error && this.state.error.toString()}
                </div>
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <strong>Stack Trace:</strong>
                <pre style={{ 
                  fontSize: '10px', 
                  color: '#666',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </div>
              
              <div>
                <strong>User Agent:</strong>
                <div style={{ fontSize: '10px', color: '#666', wordBreak: 'break-all' }}>
                  {this.state.deviceInfo && this.state.deviceInfo.userAgent}
                </div>
              </div>
            </div>
          </details>
          
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: '#00b894',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                marginTop: '10px'
              }}
            >
              🔄 Recargar Página
            </button>
            
            <button
              onClick={() => {
                const errorData = {
                  error: this.state.error?.toString(),
                  stack: this.state.errorInfo?.componentStack,
                  deviceInfo: this.state.deviceInfo,
                  timestamp: this.state.timestamp
                };
                
                const errorText = `Error Report:
Timestamp: ${errorData.timestamp}
Device: ${errorData.deviceInfo?.isMobile ? 'Mobile' : 'Desktop'}
Screen: ${errorData.deviceInfo?.screenSize}
Viewport: ${errorData.deviceInfo?.viewportSize}
Memory: ${errorData.deviceInfo?.memory}GB
User Agent: ${errorData.deviceInfo?.userAgent}

Error: ${errorData.error}

Stack Trace:
${errorData.stack}`;
                
                navigator.clipboard.writeText(errorText).then(() => {
                  alert('Información del error copiada al portapapeles');
                }).catch(() => {
                  // Fallback para navegadores que no soportan clipboard API
                  const textArea = document.createElement('textarea');
                  textArea.value = errorText;
                  document.body.appendChild(textArea);
                  textArea.select();
                  document.execCommand('copy');
                  document.body.removeChild(textArea);
                  alert('Información del error copiada al portapapeles');
                });
              }}
              style={{
                backgroundColor: '#6c5ce7',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                marginTop: '10px'
              }}
            >
              📋 Copiar Error
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
