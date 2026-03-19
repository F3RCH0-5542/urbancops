const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Venta = sequelize.define("Venta", {
    id_venta: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "ventas", 
    timestamps: false
});

module.exports = Venta;