<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuración de email
$to = "rocio@rociodiezcabezapsicologia.com"; // Cambiar por el email real de Rocío
$subject = "Nuevo mensaje de contacto - RDCP";

// Verificar que sea una petición POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    exit;
}

// Obtener datos del formulario
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validar datos requeridos
$required_fields = ['name', 'email', 'service', 'message'];
$errors = [];

foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        $errors[] = "El campo '$field' es requerido";
    }
}

// Validar email
if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = "El email no es válido";
}

// Validar checkbox de privacidad
if (!isset($data['privacy']) || empty($data['privacy'])) {
    $errors[] = "Debe aceptar la política de privacidad";
}

// Si hay errores, enviar respuesta de error
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => implode('. ', $errors)]);
    exit;
}

// Sanitizar datos
$name = htmlspecialchars(strip_tags($data['name']));
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$phone = !empty($data['phone']) ? htmlspecialchars(strip_tags($data['phone'])) : 'No proporcionado';
$service = htmlspecialchars(strip_tags($data['service']));
$message = htmlspecialchars(strip_tags($data['message']));

// Mapear servicios a nombres legibles
$service_names = [
    'individual' => 'Terapia Individual',
    'couples' => 'Terapia de Pareja',
    'consultation' => 'Consulta Gratuita',
    'question' => 'Pregunta General'
];

$service_display = isset($service_names[$service]) ? $service_names[$service] : $service;

// Crear el mensaje de email
$email_message = "
Nuevo mensaje de contacto recibido

Detalles del contacto:
- Nombre: $name
- Email: $email
- Teléfono: $phone
- Servicio solicitado: $service_display

Mensaje:
$message

---
Este mensaje fue enviado desde el formulario de contacto de PsicoWeb.
Fecha: " . date('d/m/Y H:i:s') . "
";

// Headers del email
$headers = "From: noreply@rociodiezcabezapsicologia.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Enviar email
$mail_sent = mail($to, $subject, $email_message, $headers);

// Guardar en archivo log (opcional, para respaldo)
$log_entry = date('Y-m-d H:i:s') . " - Contacto: $name ($email) - Servicio: $service_display\n";
file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);

// Respuesta
if ($mail_sent) {
    echo json_encode([
        'success' => true,
        'message' => '¡Gracias por tu mensaje! Te contactaré lo antes posible.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.'
    ]);
}
?>