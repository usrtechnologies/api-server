const mongoose = require("mongoose");
const OrderModel = require("../../models/cafeDelight/order.model")(mongoose);
// const TableModel = require("../../models/cafeDelight/table.model")(mongoose);

function getOrderTotalAmount(orderDetails) {
  if(orderDetails.length > 1){
    return orderDetails.reduce(
      (previousValue, currentValue) =>
      previousValue.menuPrice * previousValue.selectedQuantity +
      currentValue.menuPrice * currentValue.selectedQuantity
      );
  }else{
    return orderDetails[0].menuPrice * orderDetails[0].selectedQuantity;
  }
}

// Create new Order
exports.placeOrder = (req, res) => {
  if (!req.body.tableId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Order
  const order = new OrderModel({
    tableId: req.body.tableId,
    orderDetails: req.body.orderDetails,
    orderStatus: "ongoing",
    orderAmount: getOrderTotalAmount(req.body.orderDetails),
    orderPaymentMethod: "cash",
    orderCustomerName: "",
  });

  order
    .save(order)
    .then(() => {
      // call API from UI to update stust of table as booked
      res.status(200).send({
        message: "Order added successfully.",
        success: true,
      });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).send({
        message: err.message || "Internal Server Error.",
      });
    });
};

exports.updateOrder = (req, res) => {
  OrderModel.find({
    tableId: req.params.tableId,
    _id: req.params.orderId,
    orderStatus: "ongoing",
  })
    .then((data) => {
      let mergedOrderData = [...data[0].orderDetails, ...req.body.orderDetails];
      var finalOrderData = [];

      mergedOrderData.forEach((order) => {
        if (
          finalOrderData.findIndex((fOrder) => fOrder._id === order._id) < 0
        ) {
          let totalQuantity = mergedOrderData
            .filter((fOrder) => fOrder._id === order._id)
            .map((fOrder) => fOrder.selectedQuantity)
            .reduce(function (a, b) {
              return a + b;
            });
          order.selectedQuantity = totalQuantity;
          finalOrderData.push(order);
        }
      });

      const id = req.params.orderId;
      OrderModel.findByIdAndUpdate(
        id,
        {
          $set: {
            orderDetails: finalOrderData,
            orderAmount: getOrderTotalAmount(finalOrderData),
          },
        },
        { useFindAndModify: false }
      )
        .then((data) => {
          if (!data) {
            res.status(404).send({
              success: false,
              message: `Cannot update Order with id=${id}. Maybe Order was not found!`,
            });
          } else
            res.status(200).send({
              success: true,
              message: "Order was updated successfully.",
            });
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            message: "Error updating Order with id=" + id,
          });
        });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).send({
        success: false,
        message: "Error retrieving order with orderId=" + req.params.orderId,
      });
    });
};

exports.closeOrder = (req, res) => {
  OrderModel.findOneAndUpdate(
    {
      tableId: req.params.tableId,
      _id: req.params.orderId,
      orderStatus: "ongoing",
    },
    {
      $set: {
        orderStatus: "completed",
        orderPaymentMethod: req.body.orderPaymentMethod,
        orderCustomerName: req.body.orderCustomerName,
      },
    },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          success: false,
          message: `Cannot update order with orderId=${req.params.orderId}. Maybe Order was not found!`,
        });
      } else{
        // call API from UI to update stust of table as avaiable
        res.status(200).send({
          success: true,
          message: "Order Closed successfully.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Error updating Order with id=" + id,
      });
    });
};

// Read all Order
exports.getAllOrders = (req, res) => {
  OrderModel.find()
    .then((data) => {
      res.status(200).send({
        success: true,
        message: data.length ? "Order data found." : "No Order data available.",
        data: data,
        length: data.length,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Internal Server Error.",
      });
    });
};

// Read One Order by tableId
exports.getOneOrder = (req, res) => {
  OrderModel.find({ tableId: req.params.tableId ,orderStatus:'ongoing'}) // and the only order whose order status is ongoing
    .then((data) => {
      if (data.length == 0)
        res.status(404).send({
          success: false,
          message: "Not order found with this table.",
          data: data,
        });
      else
        res.status(200).send({
          success: true,
          message: "Order data found.",
          data: data[0],
        });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving order with id=" + req.params.id });
    });
};

// Delete a Order by id
exports.deleteOrder = (req, res) => {
  const id = req.params.orderId;
  OrderModel.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Order with id=${id}. Maybe Order was not found!`,
        });
      } else {
        res.send({
          message: "Order was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Order with id=" + id,
      });
    });
};
