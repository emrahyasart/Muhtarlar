var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3001",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

require("./app/route/cities.route.js")(app);
require("./app/route/towns.route.js")(app);
require("./app/route/districts.route.js")(app);
require("./app/route/neighbourhoods.route.js")(app);
require("./app/route/user.route.js")(app);
require("./app/route/resume.route.js")(app);
require("./app/route/description.route.js")(app);

const db = require("./app/config/db.config.js");

// force: true will drop the table if it already exists
// db.sequelize.sync({ force: false }).then(() => {
//   console.log("Resync with { force: false }");
// });

// Create a Server
var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});
