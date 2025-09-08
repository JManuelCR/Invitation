import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      showErrorModal: false 
    };
  }

  // Función robusta para copiar al portapapeles compatible con móviles
  copyToClipboard = (text) => {
    return new Promise((resolve, reject) => {
      // Intentar usar la API moderna de clipboard
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
          .then(() => resolve(true))
          .catch(() => {
            // Si falla, usar el método fallback
            this.fallbackCopyToClipboard(text)
              .then(() => resolve(true))
              .catch(() => reject(false));
          });
      } else {
        // Usar método fallback directamente
        this.fallbackCopyToClipboard(text)
          .then(() => resolve(true))
          .catch(() => reject(false));
      }
    });
  };

  fallbackCopyToClipboard = (text) => {
    return new Promise((resolve, reject) => {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        
        // Hacer el textarea invisible pero funcional
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.style.opacity = '0';
        textArea.style.pointerEvents = 'none';
        textArea.setAttribute('readonly', '');
        
        document.body.appendChild(textArea);
        
        // Seleccionar el texto
        textArea.focus();
        textArea.select();
        textArea.setSelectionRange(0, 99999); // Para móviles
        
        // Intentar copiar
        const successful = document.execCommand('copy');
        
        // Remover el elemento de forma segura
        setTimeout(() => {
          try {
            if (textArea && textArea.parentNode) {
              textArea.parentNode.removeChild(textArea);
            }
          } catch (removeError) {
            console.warn('No se pudo remover el elemento temporal:', removeError);
          }
        }, 100);
        
        if (successful) {
          resolve(true);
        } else {
          reject(new Error('execCommand falló'));
        }
      } catch (error) {
        reject(error);
      }
    });
  };

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
              onClick={async () => {
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
                
                try {
                  await this.copyToClipboard(errorText);
                  alert('✅ Información del error copiada al portapapeles');
                } catch (error) {
                  console.error('Error al copiar:', error);
                  // Si no se puede copiar, mostrar en modal para selección manual
                  this.setState({ showErrorModal: true, errorText: errorText });
                }
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
          
          {/* Modal para mostrar error cuando no se puede copiar */}
          {this.state.showErrorModal && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              zIndex: 10001,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '20px',
                maxWidth: '90%',
                maxHeight: '80%',
                overflow: 'auto',
                position: 'relative'
              }}>
                <button
                  onClick={() => this.setState({ showErrorModal: false })}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'transparent',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    color: '#666'
                  }}
                >
                  ✕
                </button>
                
                <h3 style={{ margin: '0 0 15px 0', color: '#d63031' }}>
                  📋 Información del Error
                </h3>
                <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#666' }}>
                  Selecciona y copia el texto manualmente:
                </p>
                
                <textarea
                  value={this.state.errorText}
                  readOnly
                  style={{
                    width: '100%',
                    height: '300px',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    resize: 'vertical'
                  }}
                  onClick={(e) => e.target.select()}
                />
                
                <div style={{ marginTop: '15px', textAlign: 'center' }}>
                  <button
                    onClick={() => this.setState({ showErrorModal: false })}
                    style={{
                      backgroundColor: '#00b894',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
