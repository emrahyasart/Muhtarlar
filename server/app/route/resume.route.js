module.exports = function(app) {
  const resumes = require("../controller/resume.controller");
  console.log("fired");
  app.post("/api/addresume", resumes.addResume);
  app.get("/api/resumes/:neighbourhoodId", resumes.findAll);
  app.put("/api/resume/:neighbourhoodId", resumes.update);
};
