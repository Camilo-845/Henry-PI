const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type:DataTypes.STRING,
      allowNull: true,
      default:'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg',
    },
    rating: {
      type:DataTypes.FLOAT,
    },
    platforms:{
    },
    genres:{
    },
    released:{
      type: DataTypes.DATEONLY,
      allowNull:true,
      defaultValue: DataTypes.NOW,
    },
    //short_screenshots:{}
    //tags:{}
  });
  sequelize.define('genres',{
    id:{
      type:DataTypes.STRING,
      primaryKey: true,
    },
    name:{
      type:DataTypes.STRING(30),
    }
  });
};
