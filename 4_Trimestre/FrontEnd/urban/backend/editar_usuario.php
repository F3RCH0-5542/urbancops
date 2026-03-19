<?php
require_once __DIR__ . '/../src/modelo/conexion.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit(0);
}

$id = $_GET["id"] ?? null;
$data = json_decode(file_get_contents("php://input"), true);

if ($id && $data) {
    $nombre = $conn->real_escape_string($data["nombre"]);
    $apellido = $conn->real_escape_string($data["apellido"]);
    $documento = $conn->real_escape_string($data["documento"]);
    $correo = $conn->real_escape_string($data["correo"]);

    $sql = "UPDATE usuarios 
            SET nombre='$nombre', apellido='$apellido', documento='$documento', correo='$correo'
            WHERE id_usuario=$id";

    if ($conn->query($sql)) {
        echo json_encode(["message" => "Usuario actualizado correctamente"]);
    } else {
        echo json_encode([
            "error" => "Error al actualizar",
            "detalle" => $conn->error,
            "sql" => $sql
        ]);
    }
} else {
    echo json_encode(["error" => "Faltan datos o ID"]);
}
?>
