const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id : {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
      defaultValue: '',  
      validate: { notEmpty: true }, // no puede estar vacio  
    },
    height_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    height_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    weight_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    weight_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    years_of_life: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    creatInDB: { // con esto tengo referencia a los pokemons que se crearon en la base de datos
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { timestamps: false} // para que no se genere la fecha de creacion y modificacion
 )};
