const { Router } = require("express");
const { 
    obtenerProductos,
    obtenerProductoPorId,
    obtenerProductosPorCategoria,
    obtenerProductosStockBajo,
    crearProducto,
    actualizarProducto,
    actualizarProductoParcial,
    eliminarProducto,
    buscarProductosPorNombre
} = require("../controller/productos.controller");
const { validarToken, soloSuperAdmin } = require("../middlewares/auth.middleware");

const router = Router();

// R: READ - Solo SuperAdmin puede ver productos
router.get("/", validarToken, soloSuperAdmin, obtenerProductos);
router.get("/stock-bajo", validarToken, soloSuperAdmin, obtenerProductosStockBajo); // Debe ir ANTES de /:id
router.get("/buscar", validarToken, soloSuperAdmin, buscarProductosPorNombre); // Query: ?nombre=camiseta
router.get("/categoria/:categoria", validarToken, soloSuperAdmin, obtenerProductosPorCategoria);
router.get("/:id", validarToken, soloSuperAdmin, obtenerProductoPorId);

// C: CREATE - Solo SuperAdmin puede crear productos
router.post("/", validarToken, soloSuperAdmin, crearProducto);

// U: UPDATE - Solo SuperAdmin puede actualizar productos
router.put("/:id", validarToken, soloSuperAdmin, actualizarProducto);
router.patch("/:id", validarToken, soloSuperAdmin, actualizarProductoParcial);

// D: DELETE - Solo SuperAdmin puede eliminar (desactivar) productos
router.delete("/:id", validarToken, soloSuperAdmin, eliminarProducto);

module.exports = router;