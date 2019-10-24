module.exports = function(app) {
  const descriptions = require("../controller/description.controller");

  app.post("/api/adddescription", descriptions.addDescription);
  app.get("/api/descriptions/:neighbourhoodId", descriptions.findAll);
  app.put("/api/description/:neighbourhoodId", descriptions.update);
};
