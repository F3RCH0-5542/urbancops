<?php
require_once __DIR__ . "/../modelo/conexion.php";

if (isset($_POST['registro'])) {
    $cnn = Conexion::getConexion();
    $usu = $_POST['txtUsu'];
    $contra = $_POST['txtPass'];
    $rol = $_POST['txtRol'];

    // Generar hash de la contraseña antes de insertarla
    $hash = password_hash($contra, PASSWORD_DEFAULT);

    // Insertar con bind_param (MySQLi)
    $sentencia = $cnn->prepare("INSERT INTO registro (nombre, contraseña, rol) VALUES (?, ?, ?)");
    $sentencia->bind_param("sss", $usu, $hash, $rol);

    if ($sentencia->execute()) {
        // Redirección según el rol
        if ($rol === "admin") {
            echo "<script>alert('✅ Usuario registrado correctamente');window.location='../login/login.php';</script>";
        } else {
            echo "<script>alert('✅ Usuario registrado correctamente');window.location='../login/login.php';</script>";
        }
    } else {
        echo "<script>alert('❌ Error al registrar: " . $sentencia->error . "');</script>";
    }

    $sentencia->close();
    $cnn->close();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <link href="css/bootstrap.min.css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registrar</title>
</head>
<body>
<div class="container mt-5">
  <div class="justify-content-center">
    <div class="col text-center">   
      <h2>Registro de Usuario</h2>
    </div>
  </div>

  <form action="" method="POST">
    <label>Nombre de usuario</label>
    <input type="text" name="txtUsu" class="form-control" required>

    <label>Contraseña</label>
    <input type="password" name="txtPass" class="form-control" required>

    <label>Rol</label>
    <select name="txtRol" class="form-control" required>
      <option value="admin">Administrador</option>
      <option value="profesor">Usuario</option>
    </select>
    
    <br>
    <div class="col text-center"> 
      <input type="submit" name="registro" value="Registrar" class="btn btn-info w-100">
    </div>
  </form>
</div>
</body>
</html>
