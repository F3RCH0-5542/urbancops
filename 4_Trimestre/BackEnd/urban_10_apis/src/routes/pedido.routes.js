const { Router } = require("express");

const {
  obtenerPedidos,
  obtenerPedidoPorId,
  obtenerPedidosPorUsuario,
  crearPedido,
  actualizarPedido,
  eliminarPedido,
  obtenerPedidosPorFecha
} = require("../controller/pedido.controller");

const {
  validarToken,
  soloSuperAdmin,
  propietarioOSuperAdmin
} = require("../middlewares/auth.middleware");

const router = Router();

// ==================================================
// 📦 PEDIDOS
// ==================================================

// ✅ Mis pedidos (usuario autenticado)
router.get(
  "/mis-pedidos",
  validarToken,
  obtenerPedidosPorUsuario
);

// 🔐 Solo SuperAdmin - ver todos
router.get(
  "/",
  validarToken,
  soloSuperAdmin,
  obtenerPedidos
);

// 🔐 Solo SuperAdmin - por fecha
router.get(
  "/fecha",
  validarToken,
  soloSuperAdmin,
  obtenerPedidosPorFecha
);

// 👤 Usuario ve los suyos / SuperAdmin cualquiera
router.get(
  "/usuario/:id_usuario",
  validarToken,
  propietarioOSuperAdmin,
  obtenerPedidosPorUsuario
);

router.get(
  "/:id",
  validarToken,
  propietarioOSuperAdmin,
  obtenerPedidoPorId
);

// ➕ Crear pedido
router.post(
  "/",
  validarToken,
  crearPedido
);

// ✏️ Actualizar pedido
router.put(
  "/:id",
  validarToken,
  soloSuperAdmin,
  actualizarPedido
);

router.patch(
  "/:id",
  validarToken,
  soloSuperAdmin,
  actualizarPedido
);

// 🗑️ Eliminar pedido
router.delete(
  "/:id",
  validarToken,
  soloSuperAdmin,
  eliminarPedido
);

module.exports = router;
