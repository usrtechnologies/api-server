const mongoose = require("mongoose");
const MenuModel = require("../../models/cafeDelight/menu.model")(mongoose);

// Create new Menu
exports.createMenu = (req, res) => {
  // Validate request
  if (!req.body.menuName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Menu
  const menu = new MenuModel({
    menuName: req.body.menuName,
    menuPrice: req.body.menuPrice,
    // menuQuantity: req.body.menuQuantity,
    menuType: req.body.menuType,
    menuCategory: req.body.menuCategory,
    selectedQuantity: 0,
  });
  // Save Menu in the database
  menu
    .save(menu)
    .then(() => {
      res.status(200).send({
        message: "Menu added successfully.",
      });
    })
    .catch((err) => {
      console.log("err",err)
      res.status(500).send({
        message: err.message || "Internal Server Error.",
      });
    });
};

// Read all Menu
exports.getAllMenus = (req, res) => {
  MenuModel.find()
    .then((data) => {
      res.status(200).send({
        success: true,
        message: data.length ? "Menu data found." : "No Menu data available.",
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

// Read One Menu by id
exports.getOneMenu = (req, res) => {
  const id = req.params.id;
  MenuModel.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found menu with id " + id });
      else
        res.status(200).send({
          success: true,
          message: "Menu data found.",
          data: data,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving menu with id=" + id });
    });
};

// Update a Menu by the id
exports.updateMenu = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  MenuModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Menu with id=${id}. Maybe Menu was not found!`,
        });
      } else
        res.status(200).send({
          success: true,
          message: "Menu was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Menu with id=" + id,
      });
    });
};

// Delete a Menu by id
exports.deleteMenu = (req, res) => {
  const id = req.params.id;
  MenuModel.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Menu with id=${id}. Maybe Menu was not found!`,
        });
      } else {
        res.send({
          message: "Menu was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Menu with id=" + id,
      });
    });
};

// Delete all Menu from the database.
exports.deleteAllMenus = (req, res) => {
  MenuModel.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Menu were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Menu.",
      });
    });
};
