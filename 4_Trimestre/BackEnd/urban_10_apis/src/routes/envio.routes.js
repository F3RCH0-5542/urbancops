const { Router } = require("express");
const { 
    obtenerEnvios,
    obtenerEnvioPorId,
    obtenerEnviosPorPedido,
    crearEnvio,
    actualizarEnvio,
    actualizarEnvioParcial,
    eliminarEnvio,
    obtenerEnviosPorFecha,
    obtenerEstadisticasEnvios
} = require("../controller/envio.controller");
const { validarToken, soloSuperAdmin, propietarioOSuperAdmin } = require("../middlewares/auth.middleware");

const router = Router();

// R: READ - Solo SuperAdmin puede ver todos los envíos
router.get("/", validarToken, soloSuperAdmin, obtenerEnvios);
router.get("/fecha", validarToken, soloSuperAdmin, obtenerEnviosPorFecha);
router.get("/estadisticas", validarToken, soloSuperAdmin, obtenerEstadisticasEnvios);

// Usuario puede ver envíos de sus propios pedidos, SuperAdmin puede ver cualquiera
router.get("/pedido/:id_pedido", validarToken, propietarioOSuperAdmin, obtenerEnviosPorPedido);
router.get("/:id", validarToken, propietarioOSuperAdmin, obtenerEnvioPorId);

// C: CREATE - Usuarios pueden registrar envíos para sus pedidos
router.post("/", validarToken, crearEnvio);

// U: UPDATE - Solo SuperAdmin puede actualizar envíos
router.put("/:id", validarToken, soloSuperAdmin, actualizarEnvio);
router.patch("/:id", validarToken, soloSuperAdmin, actualizarEnvioParcial);

// D: DELETE - Solo SuperAdmin puede eliminar envíos
router.delete("/:id", validarToken, soloSuperAdmin, eliminarEnvio);

module.exports = router;