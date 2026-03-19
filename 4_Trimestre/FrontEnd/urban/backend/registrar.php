<?php
require_once __DIR__ . '/../src/modelo/conexion.php';

// Habilitar CORS y JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Manejar preflight
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // ✅ Leer JSON
    $input = json_decode(file_get_contents("php://input"), true);

    $usu = $input['txtUsu'] ?? '';
    $contra = $input['txtPass'] ?? '';
    $rol = $input['txtRol'] ?? '';

    if (empty($usu) || empty($contra) || empty($rol)) {
        echo json_encode(["ok" => false, "error" => "Faltan datos"]);
        exit();
    }

    $cnn = $conn; // viene de conexion.php
    $hash = password_hash($contra, PASSWORD_DEFAULT);

    $stmt = $cnn->prepare("INSERT INTO registro (nombre, contraseña, rol) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $usu, $hash, $rol);

    if ($stmt->execute()) {
        echo json_encode(["ok" => true, "message" => "Usuario registrado"]);
    } else {
        echo json_encode(["ok" => false, "error" => $stmt->error]);
    }

    $stmt->close();
    $cnn->close();
} else {
    echo json_encode(["ok" => false, "error" => "Método no permitido"]);

}
