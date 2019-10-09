const db = require("../config/db.config.js");

const City = db.city;

// FETCH all cities
exports.findAll = (req, res) => {
  City.findAll()
    .then(cities => {
      // Send all cities to Client
      res.send(cities);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};
