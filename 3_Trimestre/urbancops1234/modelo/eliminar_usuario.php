<?php
require_once __DIR__ . "/conexion.php";
$conexion = conexion::getConexion();

if (!empty($_GET['id'])) {
    $id = $_GET['id'];

    // Verificar si hay pedidos asociados al usuario
    $verificar = $conexion->query("SELECT COUNT(*) AS total FROM pedido WHERE id_usuario = '$id'");
    $datos = $verificar->fetch_assoc();

    if ($datos['total'] > 0) {
        echo "<div class='alert alert-warning' role='alert'>
                No se puede eliminar el usuario porque tiene pedidos asociados.
              </div>";
        echo "<script>setTimeout(() => window.location.href='/urbancops1234/admin/index.php', 2500);</script>";
    } else {
    
        $sql = $conexion->query("DELETE FROM usuarios WHERE id_usuario = '$id'");

        if ($sql) {
            echo "<div class='alert alert-success' role='alert'>Registro eliminado correctamente</div>";
            echo "<script>setTimeout(() => window.location.href='/Urbancops1234/admin/index.php', 1500);</script>";
        } else {
            echo "<div class='alert alert-danger'>Error al eliminar el registro</div>";
        }
    }
}
