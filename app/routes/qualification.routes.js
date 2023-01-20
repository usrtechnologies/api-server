module.exports = (app) => {
    const qualification = require("../controllers/qualification.controller");
    var router = require("express").Router();
  
    // Create new Qualification
    router.post("/", qualification.create);
  
    // Read all Qualification
    router.get("/", qualification.findAll);
  
    // Read One Qualification by id
    router.get("/:id", qualification.findOne);
  
    // Update One Qualification
    router.put("/:id", qualification.update);
  
    // Delete One Qualification
    router.delete("/:id", qualification.delete);
  
    // Delete All Qualification
    router.delete("/", qualification.deleteAll);
  
    app.use("/api/qualification", router);
  };
  