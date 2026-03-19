const { Router } = require("express");
const { 
    obtenerVentas,
    obtenerVentaPorId,
    obtenerVentasPorUsuario,
    crearVenta,
    actualizarVenta,
    actualizarVentaParcial,
    obtenerVentasPorFecha,
    obtenerEstadisticasVentas
} = require("../controller/venta.controller");
const { validarToken, soloSuperAdmin, propietarioOSuperAdmin } = require("../middlewares/auth.middleware");

const router = Router();

// R: READ - Solo SuperAdmin puede ver todas las ventas y estadísticas
router.get("/", validarToken, soloSuperAdmin, obtenerVentas);
router.get("/fecha", validarToken, soloSuperAdmin, obtenerVentasPorFecha);
router.get("/estadisticas", validarToken, soloSuperAdmin, obtenerEstadisticasVentas);

// Usuario puede ver sus propias ventas, SuperAdmin puede ver cualquiera
router.get("/usuario/:id_usuario", validarToken, propietarioOSuperAdmin, obtenerVentasPorUsuario);
router.get("/:id", validarToken, propietarioOSuperAdmin, obtenerVentaPorId);

// C: CREATE - Usuarios pueden crear sus ventas
router.post("/", validarToken, crearVenta);

// U: UPDATE - Solo SuperAdmin puede actualizar ventas
router.put("/:id", validarToken, soloSuperAdmin, actualizarVenta);
router.patch("/:id", validarToken, soloSuperAdmin, actualizarVentaParcial);

// ❌ DELETE ELIMINADO - Las ventas NO se deben eliminar (historial contable)

module.exports = router;