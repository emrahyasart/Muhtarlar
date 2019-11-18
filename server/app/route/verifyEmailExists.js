const db = require("../config/db.config.js");
const User = db.user;

checkExists = (req, res, next) => {
  console.log(req.body.requestedEmail);
  User.findOne({
    where: {
      email: req.body.requestedEmail
    }
  }).then(user => {
    if (!user) {
      console.log("user not found");
      res.send("Email not found");
      return;
    }
    next();
  });
};

const emailVerify = {};
emailVerify.checkExists = checkExists;
module.exports = emailVerify;
