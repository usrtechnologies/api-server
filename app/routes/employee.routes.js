module.exports = (app) => {
  const employee = require("../controllers/employee.controller");
  var router = require("express").Router();

  // Create new Employee
  router.post("/", employee.create);

  // Read all Employee
  router.get("/", employee.findAll);

  // Read One Employee by id
  router.get("/:id", employee.findOne);

  // Update One Employee
  router.put("/:id", employee.update);

  // Delete One Employee
  router.delete("/:id", employee.delete);

  // Delete All Employee
  router.delete("/", employee.deleteAll);

  app.use("/api/employee", router);
};
