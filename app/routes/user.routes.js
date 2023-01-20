module.exports = (app) => {
  const user = require("../controllers/user.controller");
  var router = require("express").Router();

  // Create new User
  router.post("/registration", user.registration);

  // Login
  router.post("/login", user.login);

  // Read all User
  router.get("/", user.findAll);

  // Read One User by id
  router.get("/:id", user.findOne);

  // Update One User
  router.put("/:id", user.update);

  // Delete One User
  router.delete("/:id", user.delete);

  // Delete All User
  router.delete("/", user.deleteAll);



  app.use("/api/user", router);
};
