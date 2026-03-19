const { Router } = require("express");
const { 
    obtenerInventarios,
    obtenerInventarioPorId,
    crearInventario,
    actualizarInventario,
    eliminarInventario,
    obtenerInventariosPorFecha
} = require("../controller/inventario.controller");
const { validarToken, soloSuperAdmin } = require("../middlewares/auth.middleware");

const router = Router();

// R: READ - Solo SuperAdmin puede ver inventarios
router.get("/", validarToken, soloSuperAdmin, obtenerInventarios);
router.get("/fecha", validarToken, soloSuperAdmin, obtenerInventariosPorFecha);
router.get("/:id", validarToken, soloSuperAdmin, obtenerInventarioPorId);

// C: CREATE - Solo SuperAdmin puede crear inventarios
router.post("/", validarToken, soloSuperAdmin, crearInventario);

// U: UPDATE - Solo SuperAdmin puede actualizar inventarios
router.put("/:id", validarToken, soloSuperAdmin, actualizarInventario);
router.patch("/:id", validarToken, soloSuperAdmin, actualizarInventario);

// D: DELETE - Solo SuperAdmin puede eliminar inventarios
router.delete("/:id", validarToken, soloSuperAdmin, eliminarInventario);

module.exports = router;