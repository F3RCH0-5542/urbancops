<?php
require_once __DIR__ . '/../src/modelo/conexion.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit(0);
}

$id = $_GET["id"] ?? null;

if ($id) {
    $sql = "DELETE FROM usuarios WHERE id_usuario=$id";

    if ($conn->query($sql)) {
        echo json_encode(["message" => "Usuario eliminado correctamente"]);
    } else {
        echo json_encode([
            "error" => "Error al eliminar",
            "detalle" => $conn->error,
            "sql" => $sql
        ]);
    }
} else {
    echo json_encode(["error" => "No se envió ID"]);
}
?>
