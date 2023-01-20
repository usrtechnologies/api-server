module.exports = (app) => {
    const grade = require("../controllers/grade.controller");
    var router = require("express").Router();
  
    // Create new Grade
    router.post("/", grade.create);
  
    // Read all Grade
    router.get("/", grade.findAll);
  
    // Read One Grade by id
    router.get("/:id", grade.findOne);
  
    // Update One Grade
    router.put("/:id", grade.update);
  
    // Delete One Grade
    router.delete("/:id", grade.delete);
  
    // Delete All Grade
    router.delete("/", grade.deleteAll);
  
    app.use("/api/grade", router);
  };
  