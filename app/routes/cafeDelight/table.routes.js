module.exports = (app) => {
  const table = require("../../controllers/cafeDelight/table.controller");
  var router = require("express").Router();

  // Create new Table
  router.post("/createTable", table.createTable);

  // Read all Table
  router.get("/getAllTables", table.getAllTables);

  // Read One Table by id
  router.get("/getOneTable/:id", table.getOneTable);

  // Update One Table
  router.put("/updateTable/:id", table.updateTable);

  // Delete One Table
  router.delete("/deleteTable/:id", table.deleteTable);

  // Delete All Table
  router.delete("/deleteAllTables", table.deleteAllTables);

  // Change Table Status
  router.put("/changeTableStatus/:tableId", table.changeTableStatus);

  app.use("/api/table", router);
};
