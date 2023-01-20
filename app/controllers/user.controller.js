const mongoose = require("mongoose");
const UserModel = require("../models/user.model")(mongoose);

// Registration
exports.registration = (req, res) => {
  // Validate request
  if (!req.body.mobile || !req.body.email) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a User
  const user = new UserModel({
    // userID: req.body.userID,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobile: req.body.mobile,
    email: req.body.email,
    password: req.body.password
    // userDOB: req.body.userDOB,
    // userGender: req.body.userGender,
    // userQualification: req.body.userQualification,
    // userAddress: req.body.userAddress,
    // userStatus: req.body.userStatus ? req.body.userStatus : "active",
  });
  // User Register in the database
  user
    .save(user)
    .then(() => {
      res.status(200).send({
        message: "User register successfully.",
      });
    })
    .catch((err) => {
      console.log("err",err)
      res.status(500).send({
        message: err.message || "Internal Server Error.",
      });
    });
};

// Login
exports.login = (req, res) => {
  UserModel.findOne({ 'mobile':req.body.mobile })
    .then((data) => {
      if (!data){
        res.status(404).send({
          success: false,
          message: "Wrong user details..!"
        });
      } else {
        console.log(req.body.password)
        if(data.password == req.body.password){
          res.status(200).send({
            success: true,
            message: "Logged In Successfully..!",
            data: {
              token:Math.random()
            },
          });
        }else{
          res.status(401).send({
            success: false,
            message: "Invalid Password..!"
          });
        }
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving user with mobile=" + req.body.mobile });
    });
};


// Read all User
exports.findAll = (req, res) => {
  UserModel.find()
    .then((data) => {
      res.status(200).send({
        success: true,
        message: data.length ? "Users data found." : "No Users data available.",
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

// Read One User by id
exports.findOne = (req, res) => {
  const id = req.params.id;
  UserModel.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found user with id " + id });
      else
        res.status(200).send({
          success: true,
          message: "User data found.",
          data: data,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving user with id=" + id });
    });
};

// Update a User by the id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else
        res.status(200).send({
          success: true,
          message: "User was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a User by id
exports.delete = (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  UserModel.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users.",
      });
    });
};


