const mongoose = require("mongoose");
const TechnologyModel = require("../models/technology.model")(mongoose);

// Create new Technology
exports.create = (req, res) => {
  // Validate request
  if (!req.body.technologyID) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Technology
  const technology = new TechnologyModel({
    technologyID: req.body.technologyID,
    technologyName: req.body.technologyName
  });
  // Save Technology in the database
  technology
    .save(technology)
    .then(() => {
      res.status(200).send({
        message: "Technology added successfully.",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Internal Server Error.",
      });
    });
};

// Read all Technology
exports.findAll = (req, res) => {
  TechnologyModel.find()
    .then((data) => {
      res.status(200).send({
        success: true,
        message: data.length ? "Technologys data found." : "No technologys data available.",
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

// Read One Technology by id
exports.findOne = (req, res) => {
  const id = req.params.id;
  TechnologyModel.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found technology with id " + id });
      else
        res.status(200).send({
          success: true,
          message: "Technology data found.",
          data: data,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving technology with id=" + id });
    });
};

// Update a Technology by the id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  TechnologyModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Technology with id=${id}. Maybe Technology was not found!`,
        });
      } else
        res.status(200).send({
          success: true,
          message: "Technology was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Technology with id=" + id,
      });
    });
};

// Delete a Technology by id
exports.delete = (req, res) => {
  const id = req.params.id;
  TechnologyModel.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Technology with id=${id}. Maybe Technology was not found!`,
        });
      } else {
        res.send({
          message: "Technology was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Technology with id=" + id,
      });
    });
};

// Delete all technologys from the database.
exports.deleteAll = (req, res) => {
  TechnologyModel.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} technologys were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all technologys.",
      });
    });
};
