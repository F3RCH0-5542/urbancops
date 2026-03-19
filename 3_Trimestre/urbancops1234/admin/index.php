<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión Usuarios</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://kit.fontawesome.com/f7c11f6479.js" crossorigin="anonymous"></script>

    <style>
        body {
            background-image: url('../img/fondo2.webp'); 
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            color: white;
        }

        .fondo-opaco {
            background-color: rgba(0, 0, 0, 0.6);
            padding: 20px;
            border-radius: 10px;
        }

        table {
            background-color: rgba(0, 0, 0, 0.05);
            color: white;
        }

        .sidebar {
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.8);
            padding-top: 20px;
        }

        .sidebar a {
            color: white;
            display: block;
            padding: 10px 20px;
            text-decoration: none;
        }

        .sidebar a:hover {
            background-color: #000000ff;
            text-decoration: none;
        }

        .content-area {
            margin-left: 250px;
        }

        @media (max-width: 768px) {
            .content-area {
                margin-left: 0;
            }

            .sidebar {
                position: static;
                height: auto;
            }
        }
    </style>
</head>

<body>

<script>
    function eliminar() {
        return confirm("¿Seguro que desea eliminar este registro?");
    }
</script>

<div class="d-flex">
    <!-- Sidebar -->
    <div class="sidebar" style="width: 220px; background-color: #1f1f1f; height: 100vh; position: fixed;">
        <div class="text-white text-center py-4 fs-5 border-bottom">Menú</div>
        <div class="nav flex-column p-2">
            <a href="../principal/index.html" class="nav-link text-white"><i class="fa-solid fa-user-plus me-2"></i>Index Usuario</a>
            <a href="#" class="nav-link text-white"><i class="fa-solid fa-users me-2"></i>Ver Usuarios</a>
            <a href="#" class="nav-link text-white"><i class="fa-solid fa-gear me-2"></i>Configuración</a>
        </div>
    </div>

    <!-- Contenido principal -->
    <div class="flex-grow-1 ms-0 ms-md-5" style="margin-left: 220px;">
        <div class="container py-4">
            <h1 class="text-center text-dark mb-4">Gestión Usuarios</h1>

            <?php
            require_once __DIR__ . "/../modelo/conexion.php";
            require_once __DIR__ . "/../modelo/eliminar_usuario.php";
            $conexion = Conexion::getConexion();  
            ?>

            <!-- Formulario de Registro -->
            <div class="row justify-content-center mb-5">
                <div class="col-md-6 fondo-opaco">
                    <h3 class="text-center text-white mb-4">Registro personas</h3>
                    <?php include "../controlador/registro.php"; ?>
                    <form method="POST">
                        <div class="mb-3">
                            <label class="form-label text-white">Nombre</label>
                            <input type="text" class="form-control" name="nombre">
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-white">Apellido</label>
                            <input type="text" class="form-control" name="apellido">
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-white">Documento</label>
                            <input type="text" class="form-control" name="documento">
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-white">Correo</label>
                            <input type="email" class="form-control" name="correo">
                        </div>
                        <button type="submit" class="btn btn-primary w-100" name="btnRegistrar" value="Ok">Registrar</button>
                    </form>
                </div>
            </div>

            <!-- Tabla de Usuarios -->
            <div class="row">
                <div class="col fondo-opaco">
                    <table class="table table-bordered text-white">
                        <thead class="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Documento</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            $sql = $conexion->query("SELECT * FROM usuarios");
                            while ($datos = $sql->fetch_object()) { ?>
                                <tr>
                                    <td><?= $datos->id_usuario ?></td>
                                    <td><?= $datos->nombre ?></td>
                                    <td><?= $datos->apellido ?></td>
                                    <td><?= $datos->documento ?></td>
                                    <td><?= $datos->correo ?></td>
                                    <td>
                                        <a href="modificar_usuario.php?id=<?= $datos->id_usuario ?>" class="btn btn-sm btn-warning">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </a>
                                        <a onclick="return eliminar()" href="index.php?id=<?= $datos->id_usuario ?>" class="btn btn-sm btn-danger">
                                            <i class="fa-solid fa-user-minus"></i>
                                        </a>
                                    </td>
                                </tr>
                            <?php } ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ndDqU0Gzau9qJ1lfW4pNLlhNTkCfHzAVBReH9diLvGRem5+R9g2FzA8ZGN954O5Q"
    crossorigin="anonymous"></script>

</body>

</html>
