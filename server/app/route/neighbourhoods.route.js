module.exports = function(app) {
  const neighbourhoods = require("../controller/neighbourhoods.controller");

  // Retrieve selected neighbourhoods

  app.get("/api/neighbourhoods/:districtId", neighbourhoods.findAll);
};
