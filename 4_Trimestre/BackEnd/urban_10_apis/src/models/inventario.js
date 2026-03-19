// models/Inventario.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Inventario = sequelize.define("Inventario", {
    id_inventario: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    id_personalizacion: {
        type: DataTypes.INTEGER,
        allowNull: true // Puede ser null si no hay personalización
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    stock_minimo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    precio_venta: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    fecha_actualizacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "inventario", 
    timestamps: false
});

module.exports = Inventario;