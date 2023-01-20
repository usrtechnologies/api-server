const mongoose = require("mongoose");
const QualificationModel = require("../models/qualification.model")(mongoose);

// Create new Qualification
exports.create = (req, res) => {
  // Validate request
  if (!req.body.qualificationID) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Qualification
  const qualification = new QualificationModel({
    qualificationID: req.body.qualificationID,
    qualificationName: req.body.qualificationName
  });
  // Save Qualification in the database
  qualification
    .save(qualification)
    .then(() => {
      res.status(200).send({
        message: "Qualification added successfully.",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Internal Server Error.",
      });
    });
};

// Read all Qualification
exports.findAll = (req, res) => {
  QualificationModel.find()
    .then((data) => {
      res.status(200).send({
        success: true,
        message: data.length ? "Qualifications data found." : "No qualifications data available.",
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

// Read One Qualification by id
exports.findOne = (req, res) => {
  const id = req.params.id;
  QualificationModel.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found qualification with id " + id });
      else
        res.status(200).send({
          success: true,
          message: "Qualification data found.",
          data: data,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving qualification with id=" + id });
    });
};

// Update a Qualification by the id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  QualificationModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Qualification with id=${id}. Maybe Qualification was not found!`,
        });
      } else
        res.status(200).send({
          success: true,
          message: "Qualification was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Qualification with id=" + id,
      });
    });
};

// Delete a Qualification by id
exports.delete = (req, res) => {
  const id = req.params.id;
  QualificationModel.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Qualification with id=${id}. Maybe Qualification was not found!`,
        });
      } else {
        res.send({
          message: "Qualification was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Qualification with id=" + id,
      });
    });
};

// Delete all qualifications from the database.
exports.deleteAll = (req, res) => {
  QualificationModel.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} qualifications were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all qualifications.",
      });
    });
};
