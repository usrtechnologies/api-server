module.exports = (app) => {
    const technology = require("../controllers/technology.controller");
    var router = require("express").Router();
  
    // Create new Technology
    router.post("/", technology.create);
  
    // Read all Technology
    router.get("/", technology.findAll);
  
    // Read One Technology by id
    router.get("/:id", technology.findOne);
  
    // Update One Technology
    router.put("/:id", technology.update);
  
    // Delete One Technology
    router.delete("/:id", technology.delete);
  
    // Delete All Technology
    router.delete("/", technology.deleteAll);
  
    app.use("/api/technology", router);
  };
  