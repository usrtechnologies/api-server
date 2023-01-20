module.exports = (app) => {
  const order = require("../../controllers/cafeDelight/order.controller");
  var router = require("express").Router();

  // Place new Order
  router.post("/placeOrder", order.placeOrder);

  // Read all Order
  router.get("/getAllOrders", order.getAllOrders);

  // Read One Order by tableId
  router.get("/getOneOrder/:tableId", order.getOneOrder);

  // Update Order
  router.put("/updateOrder/:tableId/:orderId", order.updateOrder);

  // Close Order
  router.put("/closeOrder/:tableId/:orderId", order.closeOrder);

  //  Delete One Order
  router.delete("/deleteOrder/:orderId", order.deleteOrder);

  app.use("/api/order", router);
};
