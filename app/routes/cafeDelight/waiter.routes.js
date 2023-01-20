module.exports = (app) => {
  const waiter = require("../../controllers/cafeDelight/waiter.controller");
  var router = require("express").Router();

  // Create new Waiter
  router.post("/createWaiter", waiter.createWaiter);

  // Read all Waiter
  router.get("/getAllWaiters", waiter.getAllWaiters);

  // Read One Waiter by id
  router.get("/getOneWaiter/:id", waiter.getOneWaiter);

  // Update One Waiter
  router.put("/updateWaiter/:id", waiter.updateWaiter);

  // Delete One Waiter
  router.delete("/deleteWaiter/:id", waiter.deleteWaiter);

  // Delete All Waiter
  router.delete("/deleteWaiters", waiter.deleteWaiters);

  app.use("/api/waiter", router);
};
