<?php
session_start();
require_once __DIR__ . "/../modelo/conexion.php";

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conexion = Conexion::getConexion();

    $usuario = trim($_POST["usuario"] ?? '');
    $password = trim($_POST["password"] ?? '');

    if ($usuario === '' || $password === '') {
        echo json_encode(["success" => false, "message" => "Campos vacíos"]);
        exit;
    }

    $sql = $conexion->prepare("SELECT * FROM t_usuario WHERE nombres = ?");
    $sql->bind_param("s", $usuario);
    $sql->execute();
    $res = $sql->get_result();
    $row = $res->fetch_assoc();

    if ($row && password_verify($password, $row['contraseña'])) {
        $_SESSION['usuario'] = $usuario;
        $_SESSION['rol'] = $row['rol'] ?? null;

        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Usuario o contraseña inválidos"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}
