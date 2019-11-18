const verifySignUp = require("./verifySignUp");
const verifyPasswordChange = require("./verifyPasswordChange");
const verifyEmailExists = require("./verifyEmailExists");

module.exports = function(app) {
  const users = require("../controller/user.controller");

  // Create a new User
  app.post("/api/signup", [verifySignUp.checkDuplicates], users.signUp);
  //User sign in
  //   app.post("/api/auth/signin", users.signIn);

  app.get("/api/user/:id", users.findAll);

  app.get("/api/useremail/:email", users.findByPk);

  app.get("/api/userbyid/:userId", users.findById);

  app.post("/api/auth/signin", users.signIn);

  app.put("/api/userupdate/:userId", users.userUpdate);

  app.put("/api/neighbourhoodupdate/:userId", users.neighbourhoodUpdate);
  app.put("/api/roleupdate/:userId", users.roleUpdate);
  app.put(
    "/api/passwordchange/:userId",
    [verifyPasswordChange.checkPassword],
    users.passwordChange
  );
  app.put(
    "/api/resetpassword/:email",
    [verifyEmailExists.checkExists],
    users.resetPassword
  );

  app.get("/api/reset", users.findUserByResetPasswordToken);
  app.put("/api/updatePasswordViaEmail", users.resetForgottenPassword);
};
