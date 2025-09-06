# 🛡️ Protección de Imágenes - Invitation Project

## Descripción
Sistema completo de protección contra descarga de imágenes implementado en todo el proyecto de invitación.

## ✅ Características Implementadas

### 1. **Protección CSS Global**
- Bloqueo de selección de imágenes
- Prevención de arrastre (drag & drop)
- Deshabilitación de eventos de puntero
- Protección para imágenes y SVGs

### 2. **Protección JavaScript**
- Bloqueo de clic derecho
- Bloqueo de teclas de descarga (Ctrl+S, Ctrl+U, F12, etc.)
- Prevención de arrastre de imágenes
- Bloqueo de selección y copia
- Protección contra herramientas de desarrollador

### 3. **Cobertura Completa**
- Todas las imágenes del proyecto
- Imágenes de fondo
- SVGs y elementos gráficos
- Componentes específicos (ceremonia, recepción, etc.)

## 🚀 Cómo Funciona

### Activación Automática
La protección se activa automáticamente al cargar la aplicación en `App.jsx`:

```javascript
useEffect(() => {
  protectImages(); // Se ejecuta al montar el componente
}, []);
```

### Protección CSS
Se aplica automáticamente a todas las imágenes:

```css
img {
  -webkit-user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
  draggable: false;
}
```

### Protección JavaScript
Bloquea múltiples eventos:

```javascript
// Bloqueo de clic derecho
document.addEventListener('contextmenu', e => e.preventDefault());

// Bloqueo de teclas
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 's') e.preventDefault();
});
```

## 📁 Archivos de la Implementación

```
src/
├── utils/
│   ├── imageProtection.js      # Funciones principales de protección
│   └── protectionConfig.js     # Configuración personalizable
├── index.css                   # Estilos CSS de protección
└── App.jsx                     # Activación automática
```

## ⚙️ Configuración

### Personalizar Protección
```javascript
import { getProtectionConfig } from './utils/protectionConfig';

const customConfig = {
  enableRightClick: false,
  protectionLevel: 3,
  debugMode: true
};

const config = getProtectionConfig(customConfig);
```

### Niveles de Protección
- **Nivel 1**: Protección básica (CSS)
- **Nivel 2**: Protección media (+ JavaScript básico)
- **Nivel 3**: Protección alta (+ eventos avanzados)

## 🎯 Imágenes Protegidas

### Componentes Principales
- ✅ Portada de invitación
- ✅ Nos casamos
- ✅ Ceremonia
- ✅ Recepción
- ✅ Gifts
- ✅ Contact
- ✅ Thanks
- ✅ Travel
- ✅ Bullets
- ✅ Fathers
- ✅ Envelope
- ✅ Kiss
- ✅ Schedule
- ✅ Dress code
- ✅ We said yes
- ✅ Fathers in law card
- ✅ Tips and tricks
- ✅ Sliders
- ✅ Asistencia confirmation

### Tipos de Protección
- 🖼️ Imágenes estáticas
- 🎨 Imágenes de fondo
- 🔧 SVGs y iconos
- 📱 Elementos responsivos

## ⚠️ Limitaciones

### Lo que SÍ bloquea:
- Clic derecho en imágenes
- Arrastre de imágenes
- Teclas de descarga
- Selección de imágenes
- Herramientas de desarrollador básicas

### Lo que NO bloquea:
- Capturas de pantalla (Print Screen)
- Usuarios con JavaScript deshabilitado
- Usuarios avanzados con herramientas especializadas
- Inspección del código fuente (parcial)

## 🔧 Uso Avanzado

### Protección Específica
```javascript
import { protectSpecificImages } from './utils/imageProtection';

// Proteger solo ciertas imágenes
protectSpecificImages('.mi-clase-especial');
```

### Deshabilitar Completamente
```javascript
import { disableImageDownload } from './utils/imageProtection';

// Aplicar protección máxima
disableImageDownload();
```

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

### Dispositivos
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

## 🚨 Solución de Problemas

### Si las imágenes no se protegen:
1. Verificar que `protectImages()` se ejecute
2. Revisar la consola del navegador
3. Verificar que no haya conflictos CSS
4. Comprobar que las imágenes tengan las clases correctas

### Debug Mode
```javascript
// Habilitar mensajes de debug
const config = getProtectionConfig({ debugMode: true });
```

## 📈 Estadísticas de Protección

- **Cobertura**: 100% de imágenes del proyecto
- **Métodos**: CSS + JavaScript + Eventos
- **Nivel**: Alto (Nivel 3)
- **Performance**: Mínimo impacto en rendimiento

## 🔒 Seguridad

### Recomendaciones Adicionales:
1. **Watermarks**: Agregar marcas de agua a las imágenes
2. **Compresión**: Usar imágenes de menor calidad para web
3. **CDN**: Usar servicios con protección adicional
4. **Monitoreo**: Implementar logs de intentos de descarga

## 📞 Soporte

Para problemas o mejoras en la protección:
1. Revisar la consola del navegador
2. Verificar la configuración en `protectionConfig.js`
3. Comprobar que todos los archivos estén importados correctamente

---

**Nota**: Esta protección dificulta significativamente la descarga de imágenes para usuarios promedio, pero no es 100% infalible para usuarios muy avanzados.

