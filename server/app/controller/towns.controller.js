const db = require("../config/db.config.js");

const Town = db.town;

exports.findAll = (req, res) => {
  const cityId = req.params.cityId;
  console.log(cityId);
  Town.findAll({ where: { cityId: req.params.cityId } })
    .then(towns => {
      // Send all selected towns to Client

      res.send(towns);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};
