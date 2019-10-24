module.exports = function(app) {
  const projects = require("../controller/project.controller");

  app.post("/api/addproject", projects.addProject);
  app.get("/api/projects/:neighbourhoodId", projects.findAll);
  app.put("/api/project/:userId", projects.update);
};
