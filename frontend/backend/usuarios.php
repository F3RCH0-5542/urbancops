<?php
require_once __DIR__ . '/../src/modelo/conexion.php';


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$sql = "SELECT * FROM usuarios";
$result = $conn->query($sql);

$usuarios = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
    echo json_encode($usuarios);
} else {
    echo json_encode([
        "error" => "Error al consultar usuarios",
        "detalle" => $conn->error
    ]);
}
?>
