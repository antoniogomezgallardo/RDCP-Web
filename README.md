# RDCP - Sitio Web de Rocío Díez Cabeza

Un sitio web moderno y profesional para servicios de psicología con formulario de contacto funcional usando PHP para hosting estático.

## Características

✨ **Diseño Moderno**
- Diseño responsive optimizado para móvil (mobile-first)
- Esquema de colores profesional con gradientes verde/azul-verdoso
- Animaciones y transiciones suaves
- Interfaz limpia y accesible
- Navegación mejorada con logo clickeable y menú hamburguesa
- Botón CTA destacado en el menú de navegación
- Optimización específica para dispositivos iOS (prevención de zoom automático)

📧 **Funcionalidad de Email**
- Formulario de contacto que envía emails
- Procesamiento con PHP para hosting estático
- Validación de formularios y manejo de errores
- Log de contactos para respaldo
- Mensajes de confirmación personalizados

🛡️ **Características de Seguridad**
- Validación y sanitización de datos de entrada
- Protección contra inyección de código
- Verificación de campos requeridos
- Filtros de email válidos

🎨 **Características de Diseño**
- Favicon personalizado con el logo de Rocío (múltiples formatos)
- Información de contacto completa en footer
- Links a redes sociales (Instagram, LinkedIn)
- Diseño profesional y accesible
- **Fotografías profesionales integradas**:
  - Imagen de fondo en hero (rocio_header.png) con 15% opacidad
  - Foto de perfil profesional en sección "Sobre Mí" (rocio_portrait.png)
  - Fondo sutil en sección de sesiones con 8% opacidad
  - Enlaces estilizados con color principal y tipografía en negrita
- **Optimización móvil avanzada**:
  - Breakpoints específicos para 768px y 480px
  - Tamaños de fuente optimizados para legibilidad móvil
  - Prevención de zoom automático en formularios iOS

🚀 **Optimización SEO**
- Datos estructurados (Schema.org JSON-LD) para mejores resultados de búsqueda
- Meta tags optimizados para buscadores y redes sociales (Open Graph, Twitter Cards)
- Sitemap.xml para indexación eficiente
- Robots.txt para guía de crawlers
- Keywords y descripciones optimizadas
- Favicon en múltiples formatos (.ico, .png)
- Estructura de headings optimizada

## Instalación Rápida

### 1. Configurar Email

Edita el archivo `contact.php` en la línea 8:

```php
$to = "rocio@rociodiezcabezapsicologia.com"; // Email configurado
```

### 2. Subir Archivos

Sube todos los archivos a tu hosting:
- `index.html` - Página principal
- `contact.php` - Procesador del formulario
- `script.js` - JavaScript del frontend  
- `styles.css` - Estilos CSS
- `logo.png` - Logo
- `favicon.ico` - Favicon para navegadores
- `img/` - Carpeta con fotografías profesionales
  - `rocio_header.png` - Imagen principal para fondos
  - `rocio_portrait.png` - Foto de perfil de Rocío
- `sitemap.xml` - Mapa del sitio para SEO
- `robots.txt` - Instrucciones para crawlers
- `contact-success.html` - Página de confirmación (opcional)

### 3. Configurar Hosting

Asegúrate de que tu hosting tenga:
- Soporte para PHP (versión 7.0 o superior)
- Función `mail()` habilitada
- Permisos de escritura para el archivo de log

### 4. Probar el Formulario

Visita tu sitio web y prueba el formulario de contacto para verificar que los emails se envían correctamente.

## Proveedores de Email

Este sitio utiliza la función nativa `mail()` de PHP, que funciona automáticamente con la mayoría de hostings como:

- **Hostinger** ✅ (Recomendado)
- **SiteGround** ✅
- **Bluehost** ✅  
- **GoDaddy** ✅
- **1&1 IONOS** ✅

No requiere configuración SMTP externa - el hosting se encarga del envío de emails.

## Estructura de Archivos

```
PsicoWeb/
├── index.html              # Sitio web principal
├── contact.php             # Procesador del formulario PHP
├── contact-success.html    # Página de confirmación
├── styles.css              # Todos los estilos CSS
├── script.js               # JavaScript del frontend
├── logo.png                # Logo de Rocío
├── favicon.ico             # Favicon para navegadores
├── img/                    # Fotografías profesionales
│   ├── rocio_header.png    # Imagen principal para fondos
│   └── rocio_portrait.png  # Foto de perfil de Rocío
├── sitemap.xml             # Mapa del sitio para SEO
├── robots.txt              # Instrucciones para crawlers
├── index_maintenance-mode.html # Página de mantenimiento
├── contact_log.txt         # Log de contactos (se crea automáticamente)
├── CONTEXT.md              # Contexto del proyecto
└── README.md               # Este archivo
```

## Funcionalidad del Formulario

### `contact.php`
Procesa los datos del formulario de contacto:
- Valida campos requeridos (nombre, email, servicio, mensaje)
- Sanitiza datos de entrada para seguridad
- Envía email usando la función `mail()` de PHP
- Guarda log de contactos en `contact_log.txt`
- Responde en formato JSON para la interfaz

## Plantilla de Email

El sistema envía un email por cada envío de formulario:

**Al Psicólogo**: Notificación profesional con todos los datos del formulario:
- Nombre y datos de contacto del cliente
- Servicio solicitado (Individual, Pareja, Consulta, etc.)
- Mensaje completo
- Fecha y hora del envío
- Respaldo en archivo de log

El email incluye formato HTML limpio y toda la información necesaria para contactar al cliente.

## Optimización SEO

### Datos Estructurados
El sitio incluye marcado Schema.org completo que permite a Google mostrar:
- Información de la psicóloga y credenciales
- Servicios ofrecidos con precios
- Horarios de contacto
- Calificaciones y reseñas
- Ubicación del servicio (España)

### Meta Tags
- **Open Graph**: Para Facebook, LinkedIn y otras redes sociales
- **Twitter Cards**: Para mejorar la apariencia en Twitter
- **Keywords optimizadas**: Términos relevantes para búsquedas psicológicas
- **Descripciones meta**: Textos optimizados para resultados de búsqueda

### Archivos SEO
- **sitemap.xml**: Lista todas las páginas para los motores de búsqueda
- **robots.txt**: Guía a los crawlers sobre qué indexar
- **Favicon multi-formato**: Para aparecer correctamente en todos los navegadores

### Configuración Post-Lanzamiento
1. Registra el sitio en Google Search Console
2. Sube el sitemap.xml a Google Search Console
3. Verifica los datos estructurados con Google Rich Results Test
4. Monitorea el rendimiento SEO regularmente

## Consideraciones de Seguridad

- Validación de datos de entrada con `htmlspecialchars()` y `strip_tags()`
- Filtrado de emails con `filter_var()`
- Sanitización de todos los campos del formulario
- Verificación de checkbox de privacidad obligatorio
- Log de actividad para monitoreo
- Considera agregar CAPTCHA para protección adicional

## Diseño Responsive

### Breakpoints Optimizados
El sitio está optimizado para múltiples resoluciones con breakpoints específicos:

#### Desktop (1200px+)
- Layout completo con hero de dos columnas
- Navegación horizontal completa
- Imágenes a tamaño completo

#### Tablet (768px - 1199px) 
- Hero adaptado a columna única
- Menú hamburguesa activado
- Tamaños de fuente ajustados

#### Móvil (480px - 767px)
- **Hero optimizado**: H1 a 2.2rem, padding aumentado a 120px superior
- **Navegación**: Menú hamburguesa completamente funcional
- **Formularios**: Font-size 16px para prevenir zoom en iOS
- **Imágenes**: Foto de perfil reducida a 220px

#### Móvil Pequeño (< 480px)
- **Hero ultra-optimizado**: H1 a 1.8rem, line-height 1.2
- **Botones**: CTA reducido a padding 12px/25px
- **Footer**: Layout de una sola columna centrada
- **Formularios**: Optimizados para pantallas pequeñas

### Problemas Resueltos
- ✅ H1 del hero truncado en móvil
- ✅ Elementos superpuestos con navbar fijo
- ✅ Zoom automático indeseado en iOS
- ✅ Botones y enlaces demasiado pequeños en móvil
- ✅ Espaciado inconsistente entre secciones

## Despliegue

### Hosting Recomendado
- **Hostinger** (Recomendado)
- **SiteGround**
- **Bluehost**
- Cualquier hosting con soporte PHP

### Pasos para Subir
1. Sube todos los archivos via FTP o panel de control
2. Configura el email en `contact.php`
3. Asegúrate de que PHP esté habilitado
4. Verifica permisos de escritura para logs
5. Prueba el formulario de contacto

### Desarrollo Local
Para pruebas locales necesitas un servidor PHP:
```bash
# Con PHP instalado
php -S localhost:8000

# Con XAMPP/WAMP
# Coloca archivos en htdocs y visita localhost
```

## Cache Management y Hosting

### Sistema de Cache Busting
El sitio incluye un sistema de versionado de archivos estáticos para evitar problemas de caché:
- CSS: `styles.css?v=1.2`
- JavaScript: `script.js?v=1.2`

**Para actualizar versiones:**
1. Cambia el número de versión en `index.html`
2. Los navegadores cargarán automáticamente las nuevas versiones
3. Útil después de cambios importantes en CSS o JS

### Compatibilidad con Hosting

#### CSS con Alta Especificidad
El sitio usa selectores específicos para funcionar con cualquier hosting:
```css
.nav-menu .nav-item .nav-cta-button {
    background-color: #006769 !important;
    /* Otros estilos con !important */
}
```

#### Funcionalidades Garantizadas
- **Logo clickeable**: Scroll suave al inicio de página
- **Botón CTA**: Estilos forzados con `!important`
- **Smooth scrolling**: CSS y JavaScript como respaldo

### Limpiar Caché del Navegador
Si los cambios no se ven tras actualizar:
1. **Chrome/Edge**: Ctrl + F5 o Ctrl + Shift + R
2. **Firefox**: Ctrl + F5 o Shift + F5
3. **Safari**: Cmd + Shift + R
4. **Modo incógnito**: Para probar sin caché

## Resolución de Problemas

### Emails No se Envían
1. Verifica que la función `mail()` esté habilitada en tu hosting
2. Revisa que el email en `contact.php` sea correcto
3. Consulta logs de error de PHP en tu hosting
4. Contacta soporte técnico de tu proveedor si persiste

### Errores en el Formulario
1. Revisa la consola del navegador para errores JavaScript
2. Verifica que `contact.php` esté en la raíz del sitio
3. Asegúrate de que PHP esté funcionando (prueba con `<?php phpinfo(); ?>`)
4. Revisa permisos de archivos (644 para archivos, 755 para carpetas)

### Problemas de Conectividad
- Asegúrate de que el formulario y PHP estén en el mismo dominio
- Verifica que no haya errores de sintaxis en el código
- Revisa que todos los archivos se hayan subido correctamente

### Problemas de Hosting Específicos

#### Los Estilos No Se Aplican
1. **Verifica cache busting**: Asegúrate de que `styles.css?v=1.2` esté en `index.html`
2. **Forza recarga**: Usa Ctrl+F5 en el navegador
3. **Verifica ruta**: Confirma que `styles.css` esté en la raíz
4. **Revisa permisos**: El archivo debe ser accesible (644)

#### El Logo No Vuelve al Inicio
1. **Verifica JavaScript**: Asegúrate de que `script.js?v=1.2` se carga
2. **Consola del navegador**: Revisa errores en F12 > Console
3. **Respaldo CSS**: Debe funcionar con `scroll-behavior: smooth`
4. **Elemento #top**: Verifica que `<body id="top">` esté presente

#### Botón CTA Sin Estilos
1. **Alta especificidad**: Los estilos usan `!important` para funcionar
2. **Estructura HTML**: Verifica que la clase `nav-cta-button` esté presente
3. **Cache del hosting**: Algunos hostings cachean CSS - espera unos minutos

## Personalización

### Información de la Psicóloga
Edita el contenido en `index.html`:
- Nombre, credenciales y biografía de Rocío
- Servicios ofrecidos
- Información de contacto y horarios
- Precios

### Plantilla de Email
Modifica la plantilla en `contact.php`:
- Asunto del email (`$subject`)
- Contenido del mensaje (`$email_message`)
- Email de destino (`$to`)

### Estilos
Actualiza `styles.css`:
- Esquema de colores (variables CSS al inicio)
- Diseño y espaciado
- Puntos de quiebre responsive
- Animaciones

### Funcionalidad
Extiende `script.js`:
- Reglas de validación del formulario
- Animaciones adicionales
- Nuevas características interactivas

## Soporte

Para problemas y preguntas:
1. Revisa este README primero
2. Consulta logs de error de PHP en tu hosting
3. Verifica que la función mail() esté habilitada
4. Confirma que todos los archivos estén subidos correctamente

## Licencia

MIT License - libre para personalizar según tus necesidades.