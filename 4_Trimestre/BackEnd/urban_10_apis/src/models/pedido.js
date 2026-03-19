const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pedido = sequelize.define("Pedido", {
    id_pedido: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    fecha_pedido: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "pedido", 
    timestamps: false
});

module.exports = Pedido;