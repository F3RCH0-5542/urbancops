const Usuario = require("./Usuario");
const Rol = require("./Rol");
const Inventario = require("./inventario");
const Pedido = require("./pedido");
const Personalizacion = require("./Personalizacion");
const Pago = require("./Pago");
const Venta = require("./Venta");
const Envio = require("./Envio");
const Registro = require("./Registro");
const Pqrs = require("./Pqrs");

// Relaciones existentes
Rol.hasMany(Usuario, { foreignKey: "id_rol" });
Usuario.belongsTo(Rol, { foreignKey: "id_rol" });

// Relaciones de Usuario con Pedido
Usuario.hasMany(Pedido, { foreignKey: "id_usuario" });
Pedido.belongsTo(Usuario, { foreignKey: "id_usuario" });

// Relaciones de Pedido con Personalización
Pedido.hasMany(Personalizacion, { foreignKey: "id_pedido" });
Personalizacion.belongsTo(Pedido, { foreignKey: "id_pedido" });

// Relaciones de Personalización con Inventario
Personalizacion.hasMany(Inventario, { foreignKey: "id_personalizacion" });
Inventario.belongsTo(Personalizacion, { foreignKey: "id_personalizacion" });

// Relaciones de Pedido con Pago
Pedido.hasMany(Pago, { foreignKey: "id_pedido" });
Pago.belongsTo(Pedido, { foreignKey: "id_pedido" });

// Relaciones de Usuario con Venta
Usuario.hasMany(Venta, { foreignKey: "id_usuario" });
Venta.belongsTo(Usuario, { foreignKey: "id_usuario" });

// Relaciones de Pedido con Envío
Pedido.hasMany(Envio, { foreignKey: "id_pedido" });
Envio.belongsTo(Pedido, { foreignKey: "id_pedido" });

// Relaciones de Usuario con Registro (auditoría)
Usuario.hasMany(Registro, { foreignKey: "id_usuario" });
Registro.belongsTo(Usuario, { foreignKey: "id_usuario" });

// Relaciones de Usuario con PQRS
Usuario.hasMany(Pqrs, { foreignKey: "id_usuario" });
Pqrs.belongsTo(Usuario, { foreignKey: "id_usuario" });

module.exports = { 
    Usuario, 
    Rol, 
    Inventario, 
    Pedido, 
    Personalizacion, 
    Pago, 
    Venta, 
    Envio, 
    Registro, 
    Pqrs 
};