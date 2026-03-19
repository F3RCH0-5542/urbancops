require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const sequelize = require("./config/database");

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// =======================
// Middlewares
// =======================
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// =======================
// 🔌 RUTAS BASE (OBLIGATORIAS PARA FLUTTER)
// =======================

// Ruta raíz
app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    msg: "Servidor activo"
  });
});

// Ruta base que usa Flutter para verificar conexión
app.get("/api", (req, res) => {
  res.status(200).json({
    ok: true,
    msg: "🚀 API URBAN_10 funcionando correctamente"
  });
});


// =======================
// 🔌 RUTA BASE (FLUTTER LA NECESITA)
// =======================
app.get("/api", (req, res) => {
  res.status(200).json({
    ok: true,
    msg: "🚀 API URBAN_10 funcionando correctamente"
  });
});

// ==========================================
// 📦 IMPORTAR MODELOS
// ==========================================
const Rol = require("./models/Rol");
const Usuario = require("./models/Usuario");
const Producto = require("./models/Producto");
const Pedido = require("./models/Pedido");
const DetallePedido = require("./models/DetallePedido");
const Personalizacion = require("./models/Personalizacion");
const Pago = require("./models/Pago");
const Venta = require("./models/Venta");
const Envio = require("./models/Envio");
const Inventario = require("./models/Inventario");
const Pqrs = require("./models/Pqrs");

// ==========================================
// 🔗 ASOCIACIONES
// ==========================================
Usuario.belongsTo(Rol, { foreignKey: "id_rol" });
Rol.hasMany(Usuario, { foreignKey: "id_rol" });

Pedido.belongsTo(Usuario, { foreignKey: "id_usuario" });
Usuario.hasMany(Pedido, { foreignKey: "id_usuario" });

DetallePedido.belongsTo(Pedido, { foreignKey: "id_pedido" });
Pedido.hasMany(DetallePedido, { foreignKey: "id_pedido" });

DetallePedido.belongsTo(Producto, { foreignKey: "id_producto" });
Producto.hasMany(DetallePedido, { foreignKey: "id_producto" });

Personalizacion.belongsTo(Pedido, { foreignKey: "id_pedido" });
Pedido.hasMany(Personalizacion, { foreignKey: "id_pedido" });

Pago.belongsTo(Pedido, { foreignKey: "id_pedido" });
Pedido.hasOne(Pago, { foreignKey: "id_pedido" });

Envio.belongsTo(Pedido, { foreignKey: "id_pedido" });
Pedido.hasOne(Envio, { foreignKey: "id_pedido" });

Venta.belongsTo(Pedido, { foreignKey: "id_pedido" });
Pedido.hasOne(Venta, { foreignKey: "id_pedido" });

Inventario.belongsTo(Producto, { foreignKey: "id_producto" });
Producto.hasOne(Inventario, { foreignKey: "id_producto" });

Pqrs.belongsTo(Usuario, { foreignKey: "id_usuario" });
Usuario.hasMany(Pqrs, { foreignKey: "id_usuario" });

// ==========================================
// 🚏 RUTAS (FRONT DEPENDE DE ESTO)
// ==========================================
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/usuarios", require("./routes/user.routes"));
app.use("/api/roles", require("./routes/rol.routes"));
app.use("/api/inventarios", require("./routes/inventario.routes"));
app.use("/api/pedidos", require("./routes/pedido.routes"));
app.use("/api/personalizaciones", require("./routes/personalizacion.routes"));
app.use("/api/pagos", require("./routes/pago.routes"));
app.use("/api/ventas", require("./routes/venta.routes"));
app.use("/api/envios", require("./routes/envio.routes"));
app.use("/api/registros", require("./routes/registro.routes"));
app.use("/api/pqrs", require("./routes/pqrs.routes"));
app.use("/api/detalle-pedidos", require("./routes/detallePedido.routes"));

// =======================
// 🚀 ARRANQUE
// =======================
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Base de datos conectada");

    await sequelize.sync();
    console.log("📦 Modelos sincronizados");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
  }
})();
