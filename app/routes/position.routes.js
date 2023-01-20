module.exports = (app) => {
    const position = require("../controllers/position.controller");
    var router = require("express").Router();
  
    // Create new Position
    router.post("/", position.create);
  
    // Read all Position
    router.get("/", position.findAll);
  
    // Read One Position by id
    router.get("/:id", position.findOne);
  
    // Update One Position
    router.put("/:id", position.update);
  
    // Delete One Position
    router.delete("/:id", position.delete);
  
    // Delete All Position
    router.delete("/", position.deleteAll);
  
    app.use("/api/position", router);
  };
  