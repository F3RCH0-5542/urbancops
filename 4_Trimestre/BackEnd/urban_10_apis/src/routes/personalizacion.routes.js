const { Router } = require("express");
const {
    obtenerPersonalizaciones,
    obtenerPersonalizacionPorId,
    obtenerPersonalizacionesPorPedido,
    crearPersonalizacion,
    actualizarPersonalizacion,
    eliminarPersonalizacion,
    buscarPersonalizacionesPorDescripcion
} = require("../controller/personalizacion.controller");

const { validarToken, soloSuperAdmin } = require("../middlewares/auth.middleware");

const router = Router();

// R: READ - Solo SuperAdmin puede ver todas las personalizaciones
router.get("/", validarToken, soloSuperAdmin, obtenerPersonalizaciones);
router.get("/buscar", validarToken, soloSuperAdmin, buscarPersonalizacionesPorDescripcion);

// Usuario puede ver personalizaciones de sus pedidos (validar en controller)
router.get("/pedido/:id_pedido", validarToken, obtenerPersonalizacionesPorPedido);
router.get("/:id", validarToken, obtenerPersonalizacionPorId);

// C: CREATE - Usuario puede crear para sus pedidos (validar en controller)
router.post("/", validarToken, crearPersonalizacion);

// U: UPDATE - Solo SuperAdmin puede actualizar
router.put("/:id", validarToken, soloSuperAdmin, actualizarPersonalizacion);
router.patch("/:id", validarToken, soloSuperAdmin, actualizarPersonalizacion);

// D: DELETE - Solo SuperAdmin puede eliminar
router.delete("/:id", validarToken, soloSuperAdmin, eliminarPersonalizacion);

module.exports = router;