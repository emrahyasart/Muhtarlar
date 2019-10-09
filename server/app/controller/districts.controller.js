const db = require("../config/db.config.js");

const District = db.district;

exports.findAll = (req, res) => {
  const townId = req.params.townId;
  console.log(townId);
  District.findAll({ where: { townId: req.params.townId } })
    .then(districts => {
      // Send all selected districts to Client

      res.send(districts);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};
