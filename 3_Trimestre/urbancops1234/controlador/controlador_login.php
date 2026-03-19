<?php
session_start(); 
require_once __DIR__ . "/../modelo/conexion.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST["btningresar"])) {
    $conexion = Conexion::getConexion();

    $usuario = trim($_POST["usuario"] ?? '');
    $password = trim($_POST["password"] ?? '');

    if ($usuario === '' || $password === '') {
        header("Location: ../login/login.php?msg=" . urlencode("⚠️ Campos vacíos") . "&type=warning");
        exit;
    }

    // 🔧 CAMBIAR a tabla correcta: 'registro'
    $sql = $conexion->prepare("SELECT * FROM registro WHERE nombre = ?");
    $sql->bind_param("s", $usuario);
    $sql->execute();
    $res = $sql->get_result();
    $row = $res->fetch_assoc();

    if ($row && password_verify($password, $row['contraseña'])) {
        $_SESSION['usuario'] = $usuario;
        $_SESSION['rol'] = $row['rol'] ?? null;

        if ($row['rol'] === 'admin') {
            header("Location: ../admin/index.php");
        } else {
            header("Location: ../principal/index.html");
        }
        exit;
    } else {
        header("Location: ../login/login.php?msg=" . urlencode("Usuario o contraseña inválidos") . "&type=danger");
        exit;
    }
} else {
    header("Location: ../login/login.php");
    exit;
}

