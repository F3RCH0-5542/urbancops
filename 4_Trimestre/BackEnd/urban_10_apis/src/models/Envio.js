const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Envio = sequelize.define("Envio", {
    id_envio: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(255),  // Cambiar VARCHAR por STRING
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "envio", 
    timestamps: false
});

module.exports = Envio;