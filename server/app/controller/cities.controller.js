const db = require("../config/db.config.js");

const Cities = db.cities;

// FETCH all cities
exports.findAll = (req, res) => {
  Cities.findAll()
    .then(cities => {
      // Send all cities to Client
      res.send(cities);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};
