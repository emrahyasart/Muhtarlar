const db = require("../config/db.config.js");
const config = require("../config/config.js");
const crypto = require("crypto");
const env = require("../config/env.js");
const nodemailer = require("nodemailer");
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
    resetPasswordToken: null,
    resetPasswordExpires: null,
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

exports.findById = (req, res) => {
  console.log("req.params.userId");
  User.findOne({ where: { id: req.params.userId } })
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

exports.passwordChange = (req, res) => {
  console.log(req.body);
  User.update(
    {
      password: bcrypt.hashSync(req.body.password, 8)
    },
    { where: { id: req.params.userId } }
  )
    .then(() => {
      res.status(200).send("Password has changed successfully");
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};

exports.userUpdate = (req, res) => {
  console.log(req.body);
  console.log(req.params);
  User.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      occupation: req.body.occupation,
      email: req.body.email,
      phoneNo: req.body.phoneNo
    },
    { where: { id: req.params.userId } }
  )
    .then(() => {
      //   console.log(req);
      res.status(200).send(res.body);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};

exports.neighbourhoodUpdate = (req, res) => {
  console.log(req.body);
  console.log(req.params);
  User.update(
    {
      neighbourhoodName: req.body.neighbourhoodName,
      neighbourhoodId: req.body.neighbourhoodId
    },
    { where: { id: req.params.userId } }
  )
    .then(() => {
      //   console.log(req);
      res.status(200).send(res.body);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};

exports.roleUpdate = (req, res) => {
  console.log(req.body);
  console.log(req.params);
  User.update(
    {
      role: req.body.role
    },
    { where: { id: req.params.userId } }
  )
    .then(() => {
      //   console.log(req);
      res.status(200).send(res.body);
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    });
};

exports.resetPassword = (req, res) => {
  User.findOne({
    where: {
      email: req.body.requestedEmail
    }
  }).then(user => {
    const token = crypto.randomBytes(20).toString("hex");
    console.log(token);
    user.update({
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 360000
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${env.EMAIL_ADRESS}`,
        pass: `${env.EMAIL_PASSWORD}`
      }
    });

    const mailOptions = {
      from: "muhtarlarsifreyenileme@gmail.com",
      to: `${user.email}`,
      subject: "Şifre Yenileme Linki",
      text: `http://localhost:3000/reset/${token}`
    };

    console.log("sending email");

    transporter.sendMail(mailOptions, function(err, response) {
      if (err) {
        console.log("there was an error: ", err);
      } else {
        console.log("here is the res: ", response);
        res.status(200).json("recovery email sent");
      }
    });
  });
};

exports.findUserByResetPasswordToken = (req, res, next) => {
  console.log("findUserByResetPasswordToken");
  User.findOne({
    where: {
      resetPasswordToken: req.query.resetPasswordToken
      // resetPasswordExpires: {
      //   $gt: Date.now()
      // }
    }
  }).then(user => {
    if (user === null) {
      console.log(user);
      // console.log("password reset link is invalid or has expired");
      res.json("password reset link is invalid or has expired ");
    } else {
      res.status(200).send({
        email: user.email,
        message: "password reset link a-ok"
      });
    }
  });
};

const BCRYPT_SALT_ROUNDS = 8;

exports.resetForgottenPassword = (req, res, next) => {
  console.log("resetForgottenPassword");
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user !== null) {
      console.log("user exists");
      bcrypt
        .hash(req.body.password, BCRYPT_SALT_ROUNDS)
        .then(hashedPassword => {
          user.update({
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null
          });
        })
        .then(() => {
          console.log("password updated");
          res.status(200).send({ message: "password updated" });
        });
    } else {
      console.log("no user exists in db to update");
      res.status(404).json("no user exists in db to update");
    }
  });
};
