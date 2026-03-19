<?php
require_once __DIR__ . '/../src/modelo/conexion.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit(0);
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["error" => "No llegaron datos al backend"]);
    exit;
}

$nombre = $conn->real_escape_string($data["nombre"]);
$apellido = $conn->real_escape_string($data["apellido"]);
$documento = $conn->real_escape_string($data["documento"]);
$correo = $conn->real_escape_string($data["correo"]);

$sql = "INSERT INTO usuarios (nombre, apellido, documento, correo) 
        VALUES ('$nombre', '$apellido', '$documento', '$correo')";

if ($conn->query($sql)) {
    echo json_encode([
        "message" => "Usuario registrado correctamente",
        "usuario" => [
            "id_usuario" => $conn->insert_id,
            "nombre" => $nombre,
            "apellido" => $apellido,
            "documento" => $documento,
            "correo" => $correo
        ]
    ]);
} else {
    echo json_encode([
        "error" => "Error al registrar",
        "detalle" => $conn->error,
        "sql" => $sql
    ]);
}
?>
