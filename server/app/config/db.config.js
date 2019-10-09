const env = require("./env.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/cities
db.city = require("../model/cities.model.js")(sequelize, Sequelize);
db.town = require("../model/towns.model.js")(sequelize, Sequelize);
db.district = require("../model/districts.model.js")(sequelize, Sequelize);
db.neighbourhood = require("../model/neighbourhoods.model.js")(
  sequelize,
  Sequelize
);

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch(err => {
//     console.error("Unable to connect to the database:", err);
//   });

module.exports = db;
