<?php
require_once __DIR__ . '/../modelo/conexion.php';

$conexion = Conexion::getConexion();
if (!empty($_POST['btnModificar'])) {
    if (
        !empty($_POST['id']) &&
        !empty($_POST['nombre']) &&
        !empty($_POST['apellido']) &&
        !empty($_POST['documento']) &&
        !empty($_POST['correo'])
    ) {
        $id = $_POST['id'];
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $documento = $_POST['documento'];
        $correo = $_POST['correo'];

        $sql = $conexion->query("UPDATE usuarios SET 
            nombre='$nombre', 
            apellido='$apellido', 
            documento='$documento', 
            correo='$correo' 
            WHERE id_usuario = '$id'");

        if ($sql) {
            echo "<div class='alert alert-success'>Registro actualizado correctamente</div>";
            echo "<script>setTimeout(() => window.location.href='../admin/index.php', 1500);</script>";
        } else {
            echo "<div class='alert alert-danger'>Error al actualizar el registro</div>";
        }
    } else {
        echo "<div class='alert alert-warning'>Todos los campos son obligatorios</div>";
    }
}
?>
