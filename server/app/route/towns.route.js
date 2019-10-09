module.exports = function(app) {
  const towns = require("../controller/towns.controller");

  // Retrieve selected towns

  app.get("/api/towns/:cityId", towns.findAll);
};
