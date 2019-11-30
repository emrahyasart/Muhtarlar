var express = require("express");
var app = express();
var bodyParser = require("body-parser");
// const multer = require("multer");
// const cloudinary = require("cloudinary");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// const storage = multer.diskStorage({
//   filename: function(req, file, callback) {
//     callback(null, Date.now() + file.originalname);
//   }
// });

// const imageFilter = function(req, file, cb) {
//   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
//     return cb(new Error("Only image files are accepted!"), false);
//   }
//   cb(null, true);
// };

// const upload = multer({ storage: storage, fileFilter: imageFilter });

// cloudinary.config({
//   cloud_name: "dt0pm77f6",
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// });

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With",
//     "Content-Type, Accept"
//   );
//   next();
// });

require("./app/route/cities.route.js")(app);
require("./app/route/towns.route.js")(app);
require("./app/route/districts.route.js")(app);
require("./app/route/neighbourhoods.route.js")(app);
require("./app/route/user.route.js")(app);
require("./app/route/resume.route.js")(app);
require("./app/route/description.route.js")(app);
require("./app/route/project.route.js")(app);

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
