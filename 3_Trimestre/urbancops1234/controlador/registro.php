<?php
if (!empty($_POST["btnRegistrar"])) {
    if (
        !empty($_POST["nombre"]) &&
        !empty($_POST["apellido"]) &&
        !empty($_POST["documento"]) &&
        !empty($_POST["correo"])
    ) {
        include_once "../modelo/conexion.php";

        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $documento = $_POST["documento"];
        $correo = $_POST["correo"];

        $sql = $conexion->query("INSERT INTO usuarios (nombre, apellido, documento, correo) 
                                 VALUES ('$nombre', '$apellido', '$documento', '$correo')");

        if ($sql) {
            echo "<div class='alert alert-success'>Registro exitoso</div>";
        } else {
            echo "<div class='alert alert-danger'>Error al registrar</div>";
        }
    } else {
        echo "<div class='alert alert-warning'>Todos los campos son obligatorios</div>";
    }
}
?>
