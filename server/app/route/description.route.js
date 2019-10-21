module.exports = function(app) {
  const descriptions = require("../controller/description.controller");
  console.log("fired");
  app.post("/api/adddescription", descriptions.addDescription);
  app.get("/api/descriptions/:neighbourhoodId", descriptions.findAll);
  app.put("/api/description/:neighbourhoodId", descriptions.update);
};
