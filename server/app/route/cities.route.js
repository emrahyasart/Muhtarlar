module.exports = function(app) {
  const cities = require("../controller/cities.controller");

  // Retrieve all Cities

  app.get("/api/cities", cities.findAll);
};
