module.exports = mongoose => {
    const OrderModel = mongoose.model(
      "order",
      mongoose.Schema(
        {
          tableId: { type: String, required: false },
          // orderId: { type: String, required: false },
          orderDetails: { type: Array, required: false },
          orderStatus:{type: String, required: false},
          orderAmount:{type: Number, required: false},
          orderPaymentMethod:{type: String, required: false},
          orderCustomerName:{type: String, required: false},


          // orderQuantity: { type: String, required: true },
          // orderType: { type: String, required: true },//Veg | Non-veg
          // orderCategory: { type: String, required: true }, // Sorth Indian / North Indian / drinks
          // selectedQuantity: { type: Number, required: false }

          // orderLastName: { type: String, required: true },
          // orderMobile: { type: Number, required: true },
          // orderEmail: { type: String, required: true },
          // orderDOB: { type: Date, required: true },
          // orderGender: { type: String, required: true },
          // orderQualification: { type: String, required: false },
          // orderAddress: { type: String, required: false },
        },
        { timestamps: true }
      )
    );
    return OrderModel;
  };
  