const db = require("../config/db.config.js");
const config = require("../config/config.js");
const Description = db.description;

exports.addDescription = (req, res) => {
  // Save Description to Database
  console.log("Processing func -> AddDescription");

  Description.create({
    body: req.body.descriptionData.body,
    neighbourhoodId: req.body.descriptionData.neighbourhoodId
  })
    .then(description => {
      console.log("saved succesfully");
      res.send("Description saved successfully!" + description);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};

exports.findAll = (req, res) => {
  const neighbourhoodId = req.params.neighbourhoodId;
  console.log(neighbourhoodId);
  Description.findAll({
    where: { neighbourhoodId: req.params.neighbourhoodId }
  })
    .then(description => {
      res.send(description);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};

exports.update = (req, res) => {
  const description = req.body.body;
  const neighbourhoodId = req.params.neighbourhoodId;
  console.log(description, neighbourhoodId);
  Description.update(
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
