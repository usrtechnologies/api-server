const mongoose = require("mongoose");
const InternshipModel = require("../models/internship.model")(mongoose);

// Create new Internship
exports.create = (req, res) => {
  // Validate request
  if (!req.body.internshipID) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Internship
  const Internship = new InternshipModel({
    internshipID: req.body.internshipID,
    internshipName: req.body.internshipName,
    internshipAmount: req.body.internshipAmount,
    internshipDuration: req.body.internshipDuration,
    internshipTechnology: req.body.internshipTechnology ? req.body.internshipTechnology : [],
  });
  // Save Internship in the database
  Internship
    .save(Internship)
    .then(() => {
      res.status(200).send({
        message: "Internship added successfully.",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Internal Server Error.",
      });
    });
};

// Read all Internship
exports.findAll = (req, res) => {
  InternshipModel.find()
    .then((data) => {
      res.status(200).send({
        success: true,
        message: data.length ? "Internships data found." : "No internship data available.",
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

// Read One Internship by id
exports.findOne = (req, res) => {
  const id = req.params.id;
  InternshipModel.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Internship with id " + id });
      else
        res.status(200).send({
          success: true,
          message: "Internship data found.",
          data: data,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Internship with id=" + id });
    });
};

// Update a Internship by the id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  InternshipModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Internship with id=${id}. Maybe Internship was not found!`,
        });
      } else
        res.status(200).send({
          success: true,
          message: "Internship was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Internship with id=" + id,
      });
    });
};

// Delete a Internship by id
exports.delete = (req, res) => {
  const id = req.params.id;
  InternshipModel.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Internship with id=${id}. Maybe Internship was not found!`,
        });
      } else {
        res.send({
          message: "Internship was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Internship with id=" + id,
      });
    });
};

// Delete all Internships from the database.
exports.deleteAll = (req, res) => {
  InternshipModel.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Internships were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Internships.",
      });
    });
};
