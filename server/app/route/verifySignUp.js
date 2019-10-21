const db = require("../config/db.config.js");
const config = require("../config/config.js");
const User = db.user;

checkDuplicates = (req, res, next) => {
  User.findOne({
    where: {
      neighbourhoodId: req.body.userData.neighbourhoodId
    }
  }).then(user => {
    if (user && user.role === "Muhtar") {
      res.status(400).send("Fail -> NeighbourhoodId is already in use!");
      return;
    }

    next();
  });
};

const signUpVerify = {};
signUpVerify.checkDuplicates = checkDuplicates;

module.exports = signUpVerify;

// checkDuplicates = (req, res, next) => {
//   // -> Check Email is already in use
//   User.findOne({
//     where: {
//       email: req.body.userData.email
//     }
//   }).then(user => {
//     if (user) {
//       res.status(400).send("Fail -> Email is already in use!");
//       return;
//     }

//     User.findOne({
//       where: {
//         phoneNo: req.body.userData.phoneNo
//       }
//     }).then(user => {
//       if (user) {
//         res.status(400).send("Fail -> PhoneNo is already in use!");
//         return;
//       }
//       // req.body.userData.role === "muhtar" &&
//       User.findOne({
//         where: {
//           neighbourhoodId: req.body.userData.neighbourhoodId
//         }
//       }).then(user => {
//         if (user && user.role === "Muhtar") {
//           res.status(400).send("Fail -> NeighbourhoodId is already in use!");
//           return;
//         }

//         next();
//       });
//     });
//   });
// };

// const signUpVerify = {};
// signUpVerify.checkDuplicates = checkDuplicates;

// module.exports = signUpVerify;
