const mongoose = require("mongoose");
const EmployeeModel = require("../models/employee.model")(mongoose);

// Create new Employee
exports.create = (req, res) => {
  // Validate request
  if (!req.body.employeeID) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Employee
  const employee = new EmployeeModel({
    employeeID: req.body.employeeID,
    employeeFirstName: req.body.employeeFirstName,
    employeeLastName: req.body.employeeLastName,
    employeeMobile: req.body.employeeMobile,
    employeeEmail: req.body.employeeEmail,
    employeeDOB: req.body.employeeDOB,
    employeeGender: req.body.employeeGender,
    employeeQualification: req.body.employeeQualification,
    employeeAddress: req.body.employeeAddress,
    employeeStatus: req.body.employeeStatus ? req.body.employeeStatus : "active",
  });
  // Save Employee in the database
  employee
    .save(employee)
    .then(() => {
      res.status(200).send({
        message: "Employee added successfully.",
      });
    })
    .catch((err) => {
      console.log("err",err)
      res.status(500).send({
        message: err.message || "Internal Server Error.",
      });
    });
};

// Read all Employee
exports.findAll = (req, res) => {
  EmployeeModel.find()
    .then((data) => {
      res.status(200).send({
        success: true,
        message: data.length ? "Employees data found." : "No Employees data available.",
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

// Read One Employee by id
exports.findOne = (req, res) => {
  const id = req.params.id;
  EmployeeModel.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found employee with id " + id });
      else
        res.status(200).send({
          success: true,
          message: "Employee data found.",
          data: data,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving employee with id=" + id });
    });
};

// Update a Employee by the id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  EmployeeModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Employee with id=${id}. Maybe Employee was not found!`,
        });
      } else
        res.status(200).send({
          success: true,
          message: "Employee was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id,
      });
    });
};

// Delete a Employee by id
exports.delete = (req, res) => {
  const id = req.params.id;
  EmployeeModel.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`,
        });
      } else {
        res.send({
          message: "Employee was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Employee with id=" + id,
      });
    });
};

// Delete all Employees from the database.
exports.deleteAll = (req, res) => {
  EmployeeModel.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Employees were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Employees.",
      });
    });
};
