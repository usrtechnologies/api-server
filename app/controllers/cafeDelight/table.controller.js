const mongoose = require("mongoose");
const TableModel = require("../../models/cafeDelight/table.model")(mongoose);

// Create new Table
exports.createTable = (req, res) => {
  // add a condtion that to maintain who created this table and also get only table whos created by this user
  // Validate request
  if (!req.body.tableNumber) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Table
  const table = new TableModel({
    tableNumber: req.body.tableNumber,
    tableCapacity: req.body.tableCapacity,
    // tableLastName: req.body.tableLastName,
    // tableMobile: req.body.tableMobile,
    // tableEmail: req.body.tableEmail,
    // tableDOB: req.body.tableDOB,
    // tableGender: req.body.tableGender,
    // tableQualification: req.body.tableQualification,
    // tableAddress: req.body.tableAddress,
    tableStatus: "available",
  });
  // Save Table in the database
  table
    .save(table)
    .then(() => {
      res.status(200).send({
        message: "Table added successfully.",
      });
    })
    .catch((err) => {
      console.log("err",err)
      res.status(500).send({
        message: err.message || "Internal Server Error.",
      });
    });
};

// Read all Table
exports.getAllTables = (req, res) => {
  TableModel.find()
    .then((data) => {
      res.status(200).send({
        success: true,
        message: data.length ? "Table data found." : "No Table data available.",
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

// Read One Table by id
exports.getOneTable = (req, res) => {
  const id = req.params.id;
  TableModel.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found table with id " + id });
      else
        res.status(200).send({
          success: true,
          message: "Table data found.",
          data: data,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving table with id=" + id });
    });
};

// Update a Table by the id
exports.updateTable = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  TableModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Table with id=${id}. Maybe Table was not found!`,
        });
      } else
        res.status(200).send({
          success: true,
          message: "Table was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Table with id=" + id,
      });
    });
};

// Delete a Table by id
exports.deleteTable = (req, res) => {
  const id = req.params.id;
  TableModel.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Table with id=${id}. Maybe Table was not found!`,
        });
      } else {
        res.send({
          message: "Table was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Table with id=" + id,
      });
    });
};

// Delete all Table from the database.
exports.deleteAllTables = (req, res) => {
  TableModel.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Table were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Table.",
      });
    });
};


// Book Table
exports.changeTableStatus = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.tableId;
  TableModel.findByIdAndUpdate(id, {
    $set: {
      tableStatus: req.body.tableStatus
    },
  }, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Table with id=${id}. Maybe Table was not found!`,
        });
      } else
        res.status(200).send({
          success: true,
          message: "Table was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Table with id=" + id,
      });
    });
};