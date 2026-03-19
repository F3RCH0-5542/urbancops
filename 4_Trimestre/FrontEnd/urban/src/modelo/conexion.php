<?php
$servername = "localhost";
$username = "root"; // cambia si tienes otro usuario
$password = "";     // pon tu contraseña si tienes
$dbname = "urban1";  // asegúrate que tu DB se llama así

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        "error" => "Error en la conexión a la base de datos",
        "details" => $conn->connect_error
    ]);
    exit;
}

// Siempre JSON
header("Content-Type: application/json; charset=UTF-8");
?>
