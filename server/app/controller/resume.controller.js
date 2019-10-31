const db = require("../config/db.config.js");
const config = require("../config/config.js");
const Resume = db.resume;

exports.addResume = (req, res) => {
  // Save Resume to Database
  console.log("Processing func -> AddResume");

  Resume.create({
    body: req.body.resumeData.body,
    neighbourhoodId: req.body.resumeData.neighbourhoodId,
    userId: req.body.resumeData.userId
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
  const userId = req.params.userId;

  Resume.findAll({ where: { userId: req.params.userId } })
    .then(resume => {
      // Send all selected districts to Client
      console.log(resume);
      res.send(resume);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};

exports.update = (req, res) => {
  Resume.update(
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
