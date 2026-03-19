const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Personalizacion = sequelize.define("Personalizacion", {
    id_personalizacion: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion_personalizacion: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: "personalizacion", 
    timestamps: false
});

module.exports = Personalizacion;