const db = require("../config/db.config.js");
const config = require("../config/config.js");
const Project = db.project;

exports.addProject = (req, res) => {
  // Save Project to Database
  console.log("Processing func -> AddProject");

  Project.create({
    body: req.body.projectData.body,
    neighbourhoodId: req.body.projectData.neighbourhoodId,
    userId: req.body.projectData.userId,
    role: req.body.projectData.role
  })
    .then(project => {
      console.log("saved succesfully");
      res.send("Resume saved successfully!" + project);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};

exports.findAll = (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  Project.findAll({ where: { userId: req.params.userId } })
    .then(project => {
      // Send all selected districts to Client
      res.send(project);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};

exports.update = (req, res) => {
  const project = req.body.body;
  const userId = req.params.userId;
  console.log(project, userId);
  Project.update(
    {
      body: req.body.body
    },
    { where: { userId: req.params.userId } }
  )
    .then(() => {
      //   console.log(req);
      res.status(200).send(res.body);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};
