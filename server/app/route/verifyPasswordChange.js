const db = require("../config/db.config.js");
const config = require("../config/config.js");
const User = db.user;
var bcrypt = require("bcryptjs");

checkPassword = (req, res, next) => {
  console.log(req.body);
  User.findOne({
    where: {
      id: req.params.userId
    }
  }).then(user => {
    var passwordIsValid = bcrypt.compareSync(
      req.body.oldPassword,
      user.password
    );

    if (!passwordIsValid) {
      const err = "Invalid oldPassword";
      //   res.status(401).send("Invalid oldPassword");
      res.send(err);
      return;
    }
    next();
  });
};

const passwordVerify = {};
passwordVerify.checkPassword = checkPassword;
module.exports = passwordVerify;
