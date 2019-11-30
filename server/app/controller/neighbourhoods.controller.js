const db = require("../config/db.config.js");

const Neighbourhood = db.neighbourhood;

exports.findAll = (req, res) => {
  const districtId = req.params.districtId;
  Neighbourhood.findAll({ where: { districtId: req.params.districtId } })
    .then(neighbourhoods => {
      // Send all selected districts to Client

      res.send(neighbourhoods);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};

exports.findByPk = (req, res) => {
  console.log(req.params.id);
  Neighbourhood.findByPk(req.params.id)
    .then(neighbourhood => {
      res.send(neighbourhood);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};

exports.markerUpdate = (req, res) => {
  console.log(req.body);
  console.log(req.params);
  Neighbourhood.update(
    {
      lat: req.body.lat,
      lng: req.body.lng
    },
    { where: { id: req.params.id } }
  )
    .then(() => {
      //   console.log(req);
      res.status(200).send(res.body);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};
