<?php
session_start();

// ✅ Si ya está logueado, redirige al inicio
if (isset($_SESSION['usuarios'])) {
    header("Location: ../admin/index.php");
    exit;
}

// ✅ Manejo de mensajes pasados por URL (?msg=Error&type=danger)
$mensaje = "";
$tipo = "";

if (!empty($_GET['msg']) && !empty($_GET['type'])) {
    $mensaje = urldecode($_GET['msg']);
    $tipo = $_GET['type'];
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Iniciar sesión - UrbanCops</title>
  <link rel="stylesheet" href="stylelogin.css" />
</head>
<body>

  <div class="box">
    <span class="borderline"></span>

    <form method="POST" action="../controlador/controlador_login.php">
        <h2>Iniciar sesión</h2>

        <?php if (!empty($mensaje)): ?>
          <div class="alert alert-<?= htmlspecialchars($tipo) ?>" style="margin-bottom:15px;
            font-family:Arial; padding:10px;
            background:<?= $tipo === 'danger' ? '#fdd' : '#dfd' ?>;
            border-left: 5px solid <?= $tipo === 'danger' ? 'red' : 'green' ?>;">
            <?= htmlspecialchars($mensaje) ?>
          </div>
        <?php endif; ?>

        <div class="inputbox">
            <input type="text" name="usuario" required />
            <span>Nombre de usuario</span>
            <i></i>
        </div>  

        <div class="inputbox">
            <input type="password" name="password" required />
            <span>Contraseña</span>
            <i></i>
        </div>

        <div class="links">
            <a href="../admin/registrar.php">Registrarse</a>
        </div>

        <input type="submit" name="btningresar" value="Iniciar sesión" />
    </form>
  </div>

</body>
</html>
