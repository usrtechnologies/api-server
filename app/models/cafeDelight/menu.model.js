module.exports = mongoose => {
    const MenuModel = mongoose.model(
      "menu",
      mongoose.Schema(
        {
          menuName: { type: String, required: true },
          menuPrice: { type: Number, required: true },
          // menuQuantity: { type: String, required: true },
          menuType: { type: String, required: true },//Veg | Non-veg
          menuCategory: { type: String, required: true }, // Sorth Indian / North Indian / drinks
          selectedQuantity: { type: Number, required: false }

          // menuLastName: { type: String, required: true },
          // menuMobile: { type: Number, required: true },
          // menuEmail: { type: String, required: true },
          // menuDOB: { type: Date, required: true },
          // menuGender: { type: String, required: true },
          // menuQualification: { type: String, required: false },
          // menuAddress: { type: String, required: false },
        },
        { timestamps: true }
      )
    );
    return MenuModel;
  };