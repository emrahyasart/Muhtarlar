const db = require("../config/db.config.js");
const config = require("../config/config.js");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signUp = (req, res) => {
  // Save User to Database
  console.log("Processing func -> SignUp");

  User.create({
    firstName: req.body.userData.firstName,
    lastName: req.body.userData.lastName,
    occupation: req.body.userData.occupation,
    email: req.body.userData.email,
    phoneNo: req.body.userData.phoneNo,
    adress: req.body.userData.adress,
    password: bcrypt.hashSync(req.body.userData.password, 8),
    role: req.body.userData.role,
    neighbourhoodId: req.body.userData.neighbourhoodId,
    neighbourhoodName: req.body.userData.neighbourhoodName
  })
    .then(user => {
      console.log("registered succesfully");
      res.send("User registered successfully!" + user);
    })
    .catch(err => {
      // console.log(err.errors[0].path);
      if (err.errors[0].path == "phoneNo_UNIQUE") {
        return res.send("phoneNo duplicate");
      } else if (err.errors[0].path === "email_UNIQUE") {
        return res.send("email duplicate");
      }
    });
  // .catch(err => {
  //   err.fields.phoneNo_UNIQUE &&
  //     res.status(400).send("Fail! Error -> " + err.fields);
  // });
};

exports.findAll = (req, res) => {
  console.log(req.params.id);
  User.findAll({ where: { neighbourhoodId: req.params.id } })
    .then(user => {
      // console.log(user);
      res.send(user);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};

exports.findByPk = (req, res) => {
  console.log("req.params.email");
  User.findOne({ where: { email: req.params.email } })
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};

exports.signIn = (req, res) => {
  console.log("fired");
  User.findOne({
    where: {
      email: req.body.info.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send("User Not Found.");
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.info.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          auth: false,
          accessToken: null,
          reason: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      res
        .status(200)
        .send({ auth: true, accessToken: token, id: user.id, user: user });
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};
