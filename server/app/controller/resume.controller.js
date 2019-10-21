const db = require("../config/db.config.js");
const config = require("../config/config.js");
const Resume = db.resume;

exports.addResume = (req, res) => {
  // Save Resume to Database
  console.log("Processing func -> AddResume");

  Resume.create({
    body: req.body.resumeData.body,
    neighbourhoodId: req.body.resumeData.neighbourhoodId
  })
    .then(resume => {
      console.log("saved succesfully");
      res.send("Resume saved successfully!" + resume);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};

exports.findAll = (req, res) => {
  const neighbourhoodId = req.params.neighbourhoodId;
  console.log(neighbourhoodId);
  Resume.findAll({ where: { neighbourhoodId: req.params.neighbourhoodId } })
    .then(resume => {
      // Send all selected districts to Client
      res.send(resume);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};

exports.update = (req, res) => {
  const resume = req.body.body;
  const neighbourhoodId = req.params.neighbourhoodId;
  console.log(resume, neighbourhoodId);
  Resume.update(
    {
      body: req.body.body
    },
    { where: { neighbourhoodId: req.params.neighbourhoodId } }
  )
    .then(() => {
      //   console.log(req);
      res.status(200).send(res.body);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};
