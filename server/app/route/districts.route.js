module.exports = function(app) {
  const districts = require("../controller/districts.controller");

  // Retrieve selected districts

  app.get("/api/districts/:townId", districts.findAll);
};
