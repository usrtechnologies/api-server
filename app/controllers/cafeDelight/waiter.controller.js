const mongoose = require("mongoose");
const WaiterModel = require("../../models/cafeDelight/waiter.model")(mongoose);

// Create new Waiter
exports.createWaiter = (req, res) => {
  // Validate request
  if (!req.body.waiterId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Waiter
  const waiter = new WaiterModel({
    waiterId: req.body.waiterId,
    waiterFirstName: req.body.waiterFirstName,
    waiterLastName: req.body.waiterLastName,
    waiterEmail: req.body.waiterEmail,
    waiterMobile: req.body.waiterMobile,
    waiterAdhar: req.body.waiterAdhar,
    waiterAddress: req.body.waiterAddress,
    waiterDOB: req.body.waiterDOB,
    waiterGender: req.body.waiterGender,
    waiterStatus: req.body.waiterStatus,
    // waiterStatus: req.body.waiterStatus ? req.body.waiterStatus : "available",
  });
  // Save Waiter in the database
  waiter
    .save(waiter)
    .then(() => {
      res.status(200).send({
        message: "Waiter added successfully.",
      });
    })
    .catch((err) => {
      console.log("err",err)
      res.status(500).send({
        message: err.message || "Internal Server Error.",
      });
    });
};

// Read all Waiter
exports.getAllWaiters = (req, res) => {
  WaiterModel.find()
    .then((data) => {
      res.status(200).send({
        success: true,
        message: data.length ? "Waiter data found." : "No Waiter data available.",
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

// Read One Waiter by id
exports.getOneWaiter = (req, res) => {
  const id = req.params.id;
  WaiterModel.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found waiter with id " + id });
      else
        res.status(200).send({
          success: true,
          message: "Waiter data found.",
          data: data,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving waiter with id=" + id });
    });
};

// Update a Waiter by the id
exports.updateWaiter = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  WaiterModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Waiter with id=${id}. Maybe Waiter was not found!`,
        });
      } else
        res.status(200).send({
          success: true,
          message: "Waiter was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Waiter with id=" + id,
      });
    });
};

// Delete a Waiter by id
exports.deleteWaiter = (req, res) => {
  const id = req.params.id;
  WaiterModel.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Waiter with id=${id}. Maybe Waiter was not found!`,
        });
      } else {
        res.send({
          message: "Waiter was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Waiter with id=" + id,
      });
    });
};

// Delete all Waiter from the database.
exports.deleteWaiters = (req, res) => {
  WaiterModel.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Waiter were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Waiter.",
      });
    });
};
