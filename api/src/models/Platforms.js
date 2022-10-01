const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('platforms',{
    id:{
      type:DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name:{
      type:DataTypes.STRING(30),
      allowNull: false,
    }
  });
};