module.exports = (app) => {
  const rawMaterial = require("../../controllers/cafeDelight/rawMaterial.controller");
  var router = require("express").Router();

  // Create new RawMaterial
  router.post("/createRawMaterial", rawMaterial.createRawMaterial);

  // Read all RawMaterial
  router.get("/getRawMaterials", rawMaterial.getRawMaterials);

  // Read One RawMaterial by id
  router.get("/getOneRawMaterial/:id", rawMaterial.getOneRawMaterial);

  // Update One RawMaterial
  router.put("/updateRawMaterial/:id", rawMaterial.updateRawMaterial);

  // Delete One RawMaterial
  router.delete("/deleteRawMaterial/:id", rawMaterial.deleteRawMaterial);

  // Delete All RawMaterial
  router.delete("/deleteAllRawMaterials", rawMaterial.deleteAllRawMaterials);

  app.use("/api/rawMaterial", router);
};
