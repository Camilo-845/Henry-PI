const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
    },
    belongs_db:{
      type:DataTypes.BOOLEAN,
      defaultValue:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:"Sin Descripcion"
    },
    rating: {
      type:DataTypes.FLOAT,
      allowNull:true,
      defaultValue:1.0,
    },
    released:{
      type: DataTypes.DATEONLY,
      allowNull:true,
      defaultValue: DataTypes.NOW,
    },
    background_image:{
      type:DataTypes.STRING,
      allowNull:true,
      defaultValue:'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg',
    },
    //short_screenshots:{}
    //tags:{}
  });
};
