const mongoose = require("mongoose");
const RawMaterialModel = require("../../models/cafeDelight/rawMaterial.model")(mongoose);

// Create new RawMaterial
exports.createRawMaterial = (req, res) => {
  // Validate request
  if (!req.body.rawMaterialName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a RawMaterial
  const rawMaterial = new RawMaterialModel({
    rawMaterialName: req.body.rawMaterialName,
    rawMaterialPrice: req.body.rawMaterialPrice,
    rawMaterialQuantity: req.body.rawMaterialQuantity,
    rawMaterialMeasurement: req.body.rawMaterialMeasurement,
    rawMaterialStatus: 'instock' //outstock
  });
  // Save RawMaterial in the database
  rawMaterial
    .save(rawMaterial)
    .then(() => {
      res.status(200).send({
        message: "RawMaterial added successfully.",
      });
    })
    .catch((err) => {
      console.log("err",err)
      res.status(500).send({
        message: err.message || "Internal Server Error.",
      });
    });
};

// Read all RawMaterial
exports.getRawMaterials = (req, res) => {
  RawMaterialModel.find()
    .then((data) => {
      res.status(200).send({
        success: true,
        message: data.length ? "RawMaterial data found." : "No RawMaterial data available.",
        data: data,
        length:data.length
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Internal Server Error.",
      });
    });
};

// Read One RawMaterial by id
exports.getOneRawMaterial = (req, res) => {
  const id = req.params.id;
  RawMaterialModel.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found rawMaterial with id " + id });
      else
        res.status(200).send({
          success: true,
          message: "RawMaterial data found.",
          data: data,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving rawMaterial with id=" + id });
    });
};

// Update a RawMaterial by the id
exports.updateRawMaterial = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  RawMaterialModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update RawMaterial with id=${id}. Maybe RawMaterial was not found!`,
        });
      } else
        res.status(200).send({
          success: true,
          message: "RawMaterial was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating RawMaterial with id=" + id,
      });
    });
};

// Delete a RawMaterial by id
exports.deleteRawMaterial = (req, res) => {
  const id = req.params.id;
  RawMaterialModel.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete RawMaterial with id=${id}. Maybe RawMaterial was not found!`,
        });
      } else {
        res.send({
          message: "RawMaterial was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete RawMaterial with id=" + id,
      });
    });
};

// Delete all RawMaterial from the database.
exports.deleteAllRawMaterials = (req, res) => {
  RawMaterialModel.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} RawMaterial were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all RawMaterial.",
      });
    });
};
