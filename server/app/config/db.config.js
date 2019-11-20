const env = require("./env.js");
require("dotenv").config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    operatorsAliases: false,

    pool: {
      max: parseInt(process.env.POOL_MAX),
      min: parseInt(process.env.POOL_MIN),
      acquire: parseInt(process.env.POOL_ACQUIRE),
      idle: parseInt(process.env.POOL_IDLE)
    }
  }
);
console.log(parseInt(process.env.POOL_MIN), env.pool.min);

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
db.user = require("../model/user.model.js")(sequelize, Sequelize);
db.resume = require("../model/resume.model.js")(sequelize, Sequelize);
db.description = require("../model/description.model.js")(sequelize, Sequelize);
db.project = require("../model/project.model.js")(sequelize, Sequelize);

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch(err => {
//     console.error("Unable to connect to the database:", err);
//   });

module.exports = db;
