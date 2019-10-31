module.exports = function(app) {
  const resumes = require("../controller/resume.controller");

  app.post("/api/addresume", resumes.addResume);
  app.get("/api/resumes/:userId", resumes.findAll);
  app.put("/api/resume/:userId", resumes.update);
};
