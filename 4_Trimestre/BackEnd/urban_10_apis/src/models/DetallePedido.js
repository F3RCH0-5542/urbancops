const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DetallePedido = sequelize.define(
    "DetallePedido",
    {
        id_detalle: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_pedido: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "pedido",
                key: "id_pedido"
            }
        },
        id_producto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "productos",
                key: "id_producto"
            }
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio_unitario: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        tableName: "detalle_pedido",
        timestamps: false
    }
);

module.exports = DetallePedido;