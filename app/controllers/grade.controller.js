const mongoose = require("mongoose");
const GradeModel = require("../models/grade.model")(mongoose);

// Create new Grade
exports.create = (req, res) => {
  // Validate request
  if (!req.body.gradeID) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Grade
  const grade = new GradeModel({
    gradeID: req.body.gradeID,
    gradeName: req.body.gradeName,
    gradeValue: req.body.gradeValue,
    gradeTechnology: req.body.gradeTechnology ? req.body.gradeTechnology : []
  });
  // Save Grade in the database
  grade
    .save(grade)
    .then(() => {
      res.status(200).send({
        message: "Grade added successfully.",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Internal Server Error.",
      });
    });
};

// Read all Grade
exports.findAll = (req, res) => {
  GradeModel.find()
    .then((data) => {
      res.status(200).send({
        success: true,
        message: data.length ? "Grades data found." : "No Grades data available.",
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

// Read One Grade by id
exports.findOne = (req, res) => {
  const id = req.params.id;
  GradeModel.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found grade with id " + id });
      else
        res.status(200).send({
          success: true,
          message: "Grade data found.",
          data: data,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving grade with id=" + id });
    });
};

// Update a Grade by the id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  GradeModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Grade with id=${id}. Maybe Grade was not found!`,
        });
      } else
        res.status(200).send({
          success: true,
          message: "Grade was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Grade with id=" + id,
      });
    });
};

// Delete a Grade by id
exports.delete = (req, res) => {
  const id = req.params.id;
  GradeModel.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Grade with id=${id}. Maybe Grade was not found!`,
        });
      } else {
        res.send({
          message: "Grade was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Grade with id=" + id,
      });
    });
};

// Delete all grades from the database.
exports.deleteAll = (req, res) => {
  GradeModel.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} grades were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all grades.",
      });
    });
};
