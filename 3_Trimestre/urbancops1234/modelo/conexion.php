<?php
class Conexion {
    public static function getconexion() {
        $conexion = new mysqli("localhost", "root", "", "urban");

        if ($conexion->connect_error) {
            die("❌ Error de conexión: " . $conexion->connect_error);
        }

        $conexion->set_charset("utf8mb4");
        return $conexion;
    }
}
