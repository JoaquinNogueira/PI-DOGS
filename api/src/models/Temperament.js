const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('temperament', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: { 
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {timestamps: false}); // no quiero que se generen los campos de fecha de creacion y actualizacion;
};