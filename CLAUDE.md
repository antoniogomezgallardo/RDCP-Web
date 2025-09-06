# RDCP - Rocío Díez Cabeza Psicología Web

## Project Overview
- **Cliente**: Rocío Díez Cabeza (Psicóloga Sanitaria Colegiada M-33373)
- **Domain**: rociodiezcabezapsicologia.com
- **Type**: Professional psychology services website with online therapy focus
- **Stack**: HTML5, CSS3, Vanilla JavaScript, PHP (static hosting compatible)

## Development Guidelines
- **Version Control**: Following GitFlow methodology
- **Hosting**: Hostinger (PHP 7.0+ with mail() function enabled)
- **Cache Control**: Aggressive cache busting system (v=2.0) in place
- **Mobile First**: Responsive design with breakpoints at 768px and 480px

## Key Files Structure
```
├── index.html              # Main website (with cache busting v=2.0)
├── contact.php             # Form processor (email: rocio@rociodiezcabezapsicologia.com)
├── contact-success.html    # Confirmation page
├── styles.css              # All styles (v=2.0, high specificity with !important)
├── script.js               # Frontend logic (v=2.0, mobile fixes, carousel)
├── logo.png                # Main logo
├── favicon.ico             # Browser favicon
├── img/                    # Professional photos
│   ├── rocio_header.png    # Hero/sessions background (15%/8% opacity)
│   └── rocio_portrait.png  # About section profile photo
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Search crawler instructions
├── .htaccess               # Server cache control
└── contact_log.txt         # Auto-generated contact logs
```

## Technical Implementation
- **Email System**: PHP mail() function (no SMTP config needed)
- **Form Validation**: Client (JS) + Server (PHP) with sanitization
- **SEO**: Schema.org structured data, Open Graph, Twitter Cards
- **Performance**: Cache busting system prevents browser cache issues
- **Security**: Input sanitization with htmlspecialchars() and filter_var()

## Key Features
- **Interactive Testimonials Carousel**: 13 real patient testimonials with touch/swipe support
- **Professional Photography**: Integrated hero backgrounds and profile photos
- **Mobile Optimized**: Hybrid CSS+JS system for perfect mobile display
- **WhatsApp Integration**: Floating button and footer links (+34 660 768 788)
- **Responsive Navigation**: Logo clickeable + hamburger menu for mobile

## Services & Contact Info
- **Services**: Individual therapy, anxiety/stress, depression, relationships, emotional management, self-esteem
- **Pricing**: Individual 60€/session, 5-session pack 225€
- **Hours**: Mon-Fri 9:00-20:00, Sat 10:00-14:00
- **Contact**: rocio@rociodiezcabezapsicologia.com, +34 660 768 788

## Development Notes
- **Current Version**: v=2.0 (August 2025)
- **Mobile Issues Fixed**: H1 truncation, navbar overlap, iOS zoom prevention
- **Carousel System**: Fully responsive with autoplay, navigation, and mobile gestures
- **Hosting Compatibility**: Designed for universal hosting compatibility

## Common Tasks
- **Update Content**: Edit index.html
- **Change Email**: Modify contact.php line 8 ($to variable)
- **Style Changes**: Update styles.css (increment version number)
- **Add Features**: Extend script.js (increment version number)
- **Deploy**: Upload all files, test contact form, verify PHP mail() works

## Emergency Resources
- Crisis Phone: 024
- Emergency: 112

Remember: Always follow GitFlow methodology for version control.