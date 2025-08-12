# CONTEXT.md - RDCP

## Información del Proyecto

### Cliente
- **Nombre**: Rocío Díez Cabeza
- **Profesión**: Psicóloga Sanitaria Colegiada (M-33373)
- **Especialidades**: 
  - Psicoterapia integradora
  - Ansiedad y estrés
  - Depresión y duelo
  - Gestión emocional
  - Autoestima y desarrollo personal
  - Relaciones y apego
  - Intervenciones basadas en Mindfulness
  - Experiencia en psicoterapia online

### Objetivo del Sitio Web
Crear una presencia profesional online para ofrecer servicios de terapia psicológica mediante sesiones virtuales, proporcionando información sobre servicios y un canal directo de contacto con potenciales clientes.

## Tecnología y Arquitectura

### Stack Tecnológico
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: PHP (para hosting estático)
- **Hosting**: Compatible con Hostinger y similares
- **Email**: Función nativa `mail()` de PHP

### Evolución del Proyecto
1. **Versión inicial**: Node.js + Express con SMTP
2. **Versión actual**: PHP estático (compatible con hosting básico)

#### Archivos eliminados en la migración:
- `server.js` - Servidor Node.js/Express
- `package.json` - Dependencias de Node.js
- `package-lock.json` - Lock file
- `node_modules/` - Carpeta de dependencias
- `.env` - Variables de entorno (ya no necesarias)
- `.env.example` - Ejemplo de configuración (ya no necesario)

## Estructura y Funcionalidades

### Páginas Principales
1. **index.html**: Sitio web principal con secciones:
   - Hero/Presentación
   - Sobre Rocío (biografía profesional)
   - Servicios ofrecidos
   - Cómo funcionan las sesiones online
   - Formulario de contacto

2. **contact-success.html**: Página de confirmación post-envío

3. **index_maintenance-mode.html**: Página de mantenimiento

### Formulario de Contacto
- **Campos**: Nombre, email, teléfono (opcional), tipo de servicio, mensaje
- **Validación**: Cliente (JavaScript) y servidor (PHP)
- **Tipos de servicio**: Individual, Pregunta general
- **Procesamiento**: `contact.php`
- **Log**: Respaldo en `contact_log.txt`
- **Mensaje de éxito**: "¡Gracias por tu mensaje! Te contactaré lo antes posible."

### Características de Diseño
- **Responsive**: Mobile-first design con breakpoints optimizados (768px, 480px)
- **Colores**: Gradientes profesionales (verde/azul-verdoso) - Palette: #006769, #044542, #96E1D8
- **Tipografía**: Poppins (Google Fonts) con tamaños adaptativos por dispositivo
- **Iconos**: Font Awesome para elementos UI
- **Animaciones**: Transiciones suaves y efectos de scroll
- **Navegación**: Logo clickeable que vuelve al inicio + menú hamburguesa móvil
- **CTA destacado**: Botón "Reserva Cita" optimizado por resolución
- **Favicon**: Múltiples formatos (ICO, PNG) para compatibilidad total
- **Fotografías profesionales integradas**: 
  - Hero: rocio_header.png como fondo (15% opacidad)
  - About: rocio_portrait.png como foto de perfil centrada
  - Sessions: rocio_header.png como fondo sutil (8% opacidad)
  - Enlaces: Estilizados con color principal (#006769) y negrita
- **Optimizaciones móviles críticas**:
  - H1 del hero: 3.5rem → 2.2rem → 1.8rem (desktop → tablet → móvil)
  - Prevención zoom iOS: font-size 16px en formularios
  - Padding ajustado para navbar fijo
  - Footer responsive con layout columna única

## Configuración Técnica

### Requisitos del Hosting
- PHP 7.0 o superior
- Función `mail()` habilitada
- Permisos de escritura para logs

### Archivos de Configuración
- **Email**: Configurar destinatario en `contact.php` línea 8 (`$to = "rocio@rociodiezcabezapsicologia.com"`)
- **Logs**: Se crean automáticamente en `contact_log.txt`
- **Sin archivos .env**: La configuración está directamente en el código PHP
- **Dominio**: rociodiezcabezapsicologia.com

### Optimización SEO Implementada
- **Datos Estructurados**: Schema.org JSON-LD con información completa del negocio
- **Meta Tags**: Open Graph, Twitter Cards, keywords optimizadas
- **Sitemap**: sitemap.xml para indexación de motores de búsqueda
- **Robots.txt**: Instrucciones para crawlers de búsqueda
- **Favicon multi-formato**: ICO y PNG para máxima compatibilidad
- **Estructura semántica**: Headings organizados para SEO

### Mejoras Técnicas de Hosting
- **Cache Busting**: Sistema de versionado (?v=1.2) para CSS y JS
- **CSS Alta Especificidad**: Selectores con !important para compatibilidad universal
- **Smooth Scrolling**: Implementado en CSS y JavaScript como respaldo
- **Navegación Optimizada**: Logo clickeable con scroll al inicio de página
- **Estilos Forzados**: CTA button con estilos que funcionan en cualquier hosting
- **Responsive Robusto**: 
  - Media queries específicas para 768px y 480px
  - Sistema de fallbacks para dispositivos edge-case
  - Optimizaciones iOS específicas (zoom prevention)
- **Performance Optimizada**:
  - Imágenes de fondo con opacidades bajas para mantener performance
  - CSS optimizado para rendering móvil
  - JavaScript mínimo para funcionalidad core

### Seguridad Implementada
- Sanitización con `htmlspecialchars()` y `strip_tags()`
- Validación de email con `filter_var()`
- Verificación de campos requeridos
- Checkbox de privacidad obligatorio
- Headers CORS para APIs

## Información de Servicios

### Servicios Ofrecidos
1. **Terapia Individual**: Sesiones personalizadas
2. **Estrés y Ansiedad**: Estrategias efectivas de manejo
3. **Depresión y Duelo**: Acompañamiento terapéutico especializado
4. **Relaciones y Apego**: Vínculos satisfactorios y comunicación asertiva
5. **Gestión Emocional**: Identificación y expresión saludable de emociones
6. **Autoestima**: Fortalecimiento de autoconfianza y relación personal

### Proceso de Sesiones
1. **Pide tu cita**: Contacto por WhatsApp, email o formulario
2. **Contacto**: Respuesta rápida para acordar día y hora
3. **Consulta inicial**: Sesión gratuita de 20 minutos para evaluar compatibilidad

### Tarifas
- Individual: 60€/sesión
- Bono 5 sesiones: 225€

### Horarios de Contacto
- Lunes - Viernes: 9:00 - 20:00
- Sábado: 10:00 - 14:00

### Información de Contacto
- **Teléfono**: +34 660 768 788
- **Email**: rocio@rociodiezcabezapsicologia.com
- **Instagram**: https://instagram.com/rociodiezcabezapsicologia
- **LinkedIn**: https://es.linkedin.com/in/rociodiezcabeza

## Recursos de Emergencia
- Teléfono de Crisis: 024
- Emergencias: 112

## Mantenimiento y Actualizaciones

### Personalización Común
1. **Contenido**: Editar textos en `index.html`
2. **Estilos**: Modificar variables CSS en `styles.css`
3. **Email**: Personalizar plantilla en `contact.php` (línea 8 para destinatario)
4. **Funcionalidad**: Extender validaciones en `script.js`
5. **Configuración**: Todo está en el código PHP (sin archivos .env externos)

### Archivos Críticos
- `contact.php`: Procesamiento del formulario
- `script.js`: Lógica del frontend y validaciones
- `styles.css`: Todos los estilos visuales
- `index.html`: Contenido principal
- `img/rocio_header.png`: Imagen principal para fondos de hero y sessions
- `img/rocio_portrait.png`: Foto de perfil para sección "Sobre Mí"
- `sitemap.xml`: Mapa del sitio para SEO
- `robots.txt`: Instrucciones para crawlers
- `favicon.ico`: Favicon principal del sitio

### Monitoreo
- Revisar `contact_log.txt` para actividad de formularios
- Monitorear logs de error de PHP en hosting
- Verificar funcionamiento de emails periódicamente

### Despliegue y Compatibilidad de Hosting

#### Problemas Comunes y Soluciones
1. **Caché de CSS/JS**: Resuelto con cache busting (?v=1.2)
2. **Conflictos de CSS**: Resuelto con alta especificidad y !important
3. **Scroll no funciona**: Dual implementation (CSS + JavaScript)
4. **Estilos no cargan**: Verificar permisos de archivos (644)

#### Hostings Probados
- **Hostinger**: ✅ Funciona perfectamente
- **Compatibilidad general**: Alta gracias a mejoras técnicas implementadas

#### Archivos Críticos para Funcionalidad
- `index.html` (con cache busting)
- `styles.css` (con alta especificidad)
- `script.js` (con manejo mejorado de scroll)
- `contact.php` (mensaje actualizado)

## Historial de Versiones y Mejoras

### Versión Actual (Enero 2025)
- **Funcionalidad de fotografías profesionales**:
  - Integración de rocio_header.png y rocio_portrait.png
  - Fondos con opacidades optimizadas (15% hero, 8% sessions)
  - Foto de perfil profesional con posicionamiento centrado

- **Optimizaciones responsive críticas**:
  - Corrección H1 truncado en móvil (problema reportado por usuario)
  - Breakpoints específicos para 768px y 480px
  - Prevención zoom iOS en formularios
  - CTA y elementos UI optimizados para móvil

- **Mejoras UX/UI**:
  - Enlaces en sessions estilizados con color principal y negrita
  - Footer responsive con layout adaptativo
  - Navegación mejorada con menú hamburguesa

### Evolución del Proyecto
1. **Versión inicial**: Node.js + Express con SMTP
2. **Migración PHP**: Para compatibilidad hosting estático
3. **Optimizaciones hosting**: Cache busting y alta especificidad CSS
4. **Integración fotográfica**: Elementos visuales profesionales
5. **Responsive perfecto**: Solución problemas móviles críticos

## Notas de Desarrollo
- Diseño adaptado específicamente para servicios de psicología
- Interfaz profesional que inspira confianza
- Proceso de contacto simplificado para reducir fricción
- Experiencia de usuario optimizada para personas buscando ayuda psicológica
- Mensajes y validaciones en español argentino/español neutro
- Fotografías profesionales integradas manteniendo la legibilidad
- Elementos visuales que transmiten calidez y profesionalidad
- Enfoque en la imagen personal de Rocío para generar confianza
- **Testing riguroso en dispositivos móviles reales**
- **Optimización continua basada en feedback de usuario**