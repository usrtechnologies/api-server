module.exports = (app) => {
  const menu = require("../../controllers/cafeDelight/menu.controller");
  var router = require("express").Router();

  // Create new Menu
  router.post("/createMenu", menu.createMenu);

  // Read all Menu
  router.get("/getAllMenus", menu.getAllMenus);

  // Read One Menu by id
  router.get("/getOneMenu/:id", menu.getOneMenu);

  // Update One Menu
  router.put("/updateMenu/:id", menu.updateMenu);

  // Delete One Menu
  router.delete("/deleteMenu/:id", menu.deleteMenu);

  // Delete All Menu
  router.delete("/deleteAllMenus", menu.deleteAllMenus);

  app.use("/api/menu", router);
};
