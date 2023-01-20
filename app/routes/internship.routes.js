module.exports = (app) => {
    const internship = require("../controllers/internship.controlle");
    var router = require("express").Router();
  
    // Create new Internship
    router.post("/", internship.create);
  
    // Read all Internship
    router.get("/", internship.findAll);
  
    // Read One Internship by id
    router.get("/:id", internship.findOne);
  
    // Update One Internship
    router.put("/:id", internship.update);
  
    // Delete One Internship
    router.delete("/:id", internship.delete);
  
    // Delete All Internship
    router.delete("/", internship.deleteAll);
  
    app.use("/api/internship", router);
  };
  