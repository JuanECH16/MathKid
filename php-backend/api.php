<?php
header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// Simulando una respuesta de API
$response = [
    'status' => 'success',
    'data' => 'Este es un ejemplo de respuesta de la API'
];

echo json_encode($response);
?>
