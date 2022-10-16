require('dotenv').config();
const { Sequelize,Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  PGUSER,PGPASSWORD,PGHOST,PGPORT,PGDATABASE,DB_USER, DB_PASSWORD, DB_HOST,DATABASE_URL
} = process.env;
 
console.log("hola",PGUSER,PGPASSWORD,PGHOST,PGPORT,PGDATABASE)
/* const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@localhost:${DB_HOST}/videogames`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
}); */

const sequelize = new Sequelize(`postgresql://${{ PGUSER }}:${{ PGPASSWORD }}@${{ PGHOST }}:${{ PGPORT }}/${{ PGDATABASE }}`, {
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

//check connection (optional)
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));


const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Platform,Genre} = sequelize.models;

Videogame.belongsToMany(Platform,{through: 'videogame_platforms'});
Platform.belongsToMany(Videogame,{through: 'videogame_platforms'});

Videogame.belongsToMany(Genre,{through: 'videogame_genres'});
Genre.belongsToMany(Videogame,{through: 'videogame_genres'});
// Aca vendrian las relaciones
// Product.hasMany(Reviews);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
  Op
};
