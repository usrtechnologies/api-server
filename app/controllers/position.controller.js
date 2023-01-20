const mongoose = require("mongoose");
const PositionModel = require("../models/position.model")(mongoose);

// Create new Position
exports.create = (req, res) => {
  // Validate request
  if (!req.body.positionID) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Position
  const position = new PositionModel({
    positionID: req.body.positionID,
    positionName: req.body.positionName,
    positionType: req.body.positionType
  });
  // Save Position in the database
  position
    .save(position)
    .then(() => {
      res.status(200).send({
        message: "Position added successfully.",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Internal Server Error.",
      });
    });
};

// Read all Position
exports.findAll = (req, res) => {
  PositionModel.find()
    .then((data) => {
      res.status(200).send({
        success: true,
        message: data.length ?  "Positions data found." : "No positions data available.",
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

// Read One Position by id
exports.findOne = (req, res) => {
  const id = req.params.id;
  PositionModel.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found position with id " + id });
      else
        res.status(200).send({
          success: true,
          message: "Position data found.",
          data: data,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving position with id=" + id });
    });
};

// Update a Position by the id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  PositionModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Position with id=${id}. Maybe Position was not found!`,
        });
      } else
        res.status(200).send({
          success: true,
          message: "Position was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Position with id=" + id,
      });
    });
};

// Delete a Position by id
exports.delete = (req, res) => {
  const id = req.params.id;
  PositionModel.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Position with id=${id}. Maybe Position was not found!`,
        });
      } else {
        res.send({
          message: "Position was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Position with id=" + id,
      });
    });
};

// Delete all positions from the database.
exports.deleteAll = (req, res) => {
  PositionModel.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} positions were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all positions.",
      });
    });
};
