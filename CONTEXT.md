# CONTEXT.md - PsicoWeb

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
- **Tipos de servicio**: Individual, Pareja, Consulta gratuita, Pregunta general
- **Procesamiento**: `contact.php`
- **Log**: Respaldo en `contact_log.txt`

### Características de Diseño
- **Responsive**: Mobile-first design
- **Colores**: Gradientes profesionales (morado/azul)
- **Tipografía**: Poppins (Google Fonts)
- **Iconos**: Font Awesome
- **Animaciones**: Transiciones suaves y efectos de scroll
- **Navegación**: Logo clickeable que vuelve al inicio
- **CTA destacado**: Botón "Reserva Cita" en el menú principal
- **Favicon**: Múltiples formatos (ICO, PNG) para compatibilidad total

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
- `sitemap.xml`: Mapa del sitio para SEO
- `robots.txt`: Instrucciones para crawlers
- `favicon.ico`: Favicon principal del sitio

### Monitoreo
- Revisar `contact_log.txt` para actividad de formularios
- Monitorear logs de error de PHP en hosting
- Verificar funcionamiento de emails periódicamente

## Notas de Desarrollo
- Diseño adaptado específicamente para servicios de psicología
- Interfaz profesional que inspira confianza
- Proceso de contacto simplificado para reducir fricción
- Experiencia de usuario optimizada para personas buscando ayuda psicológica
- Mensajes y validaciones en español argentino/español neutro