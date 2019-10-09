const db = require("../config/db.config.js");

const Neighbourhood = db.neighbourhood;

exports.findAll = (req, res) => {
  const districtId = req.params.districtId;
  console.log(districtId);
  Neighbourhood.findAll({ where: { districtId: req.params.districtId } })
    .then(neighbourhoods => {
      // Send all selected districts to Client

      res.send(neighbourhoods);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};
