<?php
require_once __DIR__ . "/../modelo/conexion.php";
$conexion = conexion::getConexion();


$id = $_GET['id'] ?? null;

if (!$id) {
    echo "<div class='alert alert-danger'>ID inválido</div>";
    exit;
}

$sql = $conexion->query("SELECT * FROM usuarios WHERE id_usuario = '$id'");

if (!$sql || $sql->num_rows === 0) {
    echo "<div class='alert alert-danger'>Registro no encontrado</div>";
    exit;
}

$datos = $sql->fetch_object();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Modificar Persona</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <form class="col-4 p-3 m-auto" method="POST" action="/urbancops1234/controlador/modificar_usuario.php">
        <h3 class="text-center alert alert-secondary">Modificar registro personas</h3>

        <input type="hidden" name="id" value="<?= $datos->id_usuario ?>">

        <div class="mb-3">
            <label class="form-label">Nombre</label>
            <input type="text" class="form-control" name="nombre" value="<?= $datos->nombre ?>">
        </div>

        <div class="mb-3">
            <label class="form-label">Apellido</label>
            <input type="text" class="form-control" name="apellido" value="<?= $datos->apellido ?>">
        </div>

        <div class="mb-3">
            <label class="form-label">Documento</label>
            <input type="text" class="form-control" name="documento" value="<?= $datos->documento ?>">
        </div>

        <div class="mb-3">
            <label class="form-label">Correo</label>
            <input type="email" class="form-control" name="correo" value="<?= $datos->correo ?>">
        </div>

        <button type="submit" class="btn btn-primary" name="btnModificar" value="ok">Modificar</button>
    </form>
</body>
</html>
