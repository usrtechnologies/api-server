module.exports = (app) => {
  const tutorials = require("../controllers/tutorial.controller.js");
  var router = require("express").Router();

  // Create One
  router.post("/", tutorials.create);

  // Read All
  router.get("/", tutorials.findAll);

  // Read All
  router.get("/published", tutorials.findAllPublished);

  // Read One
  router.get("/:id", tutorials.findOne);

  // Update One
  router.put("/:id", tutorials.update);

  // Delete One
  router.delete("/:id", tutorials.delete);

  // Delete All
  router.delete("/", tutorials.deleteAll);
  
  app.use("/api/tutorials", router);
};
