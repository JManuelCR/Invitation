# Invitación de Boda

Esta es una aplicación de invitación de boda que permite mostrar información personalizada para cada invitado basada en su ID único.

## Cómo usar

### URLs disponibles:

1. **Página principal (sin invitado específico):**
   ```
   http://localhost:5173/
   http://localhost:5173/envelope
   ```

2. **Invitación personalizada para un invitado específico:**
   ```
   http://localhost:5173/invitacion/{guestId}
   ```
   
   Donde `{guestId}` es el ID único del invitado en la base de datos.

### Ejemplos de uso:

- `http://localhost:5173/invitacion/ABC123` - Invitación para el invitado con ID "ABC123"
- `http://localhost:5173/invitacion/MARIA001` - Invitación para el invitado con ID "MARIA001"

## Funcionalidades

- **Información personalizada:** Muestra el nombre del invitado y número de pases disponibles
- **Diseño responsivo:** Se adapta a diferentes tamaños de pantalla
- **Audio de fondo:** Música de fondo con controles de reproducción
- **Animaciones:** Efectos visuales y transiciones suaves

## Configuración del Backend

Asegúrate de que el backend esté configurado para responder a las siguientes rutas:

- `GET /guest/{guestId}` - Obtener información del invitado por ID

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000
```

## Instalación y ejecución

```bash
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`
