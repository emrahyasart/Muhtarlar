const verifySignUp = require("./verifySignUp");

module.exports = function(app) {
  console.log("register demand has arrived");
  const users = require("../controller/user.controller");

  // Create a new User
  app.post("/api/signup", [verifySignUp.checkDuplicates], users.signUp);
  //User sign in
  //   app.post("/api/auth/signin", users.signIn);

  app.get("/api/user/:id", users.findAll);

  app.get("/api/useremail/:email", users.findByPk);

  app.post("/api/auth/signin", users.signIn);
};
