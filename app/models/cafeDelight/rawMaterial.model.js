module.exports = mongoose => {
    const EmployeeModel = mongoose.model(
      "rawMaterial",
      mongoose.Schema(
        {
          rawMaterialName: { type: String, required: true },
          rawMaterialPrice: { type: Number, required: true },
          rawMaterialQuantity: { type: Number, required: true },
          rawMaterialMeasurement : { type: String, required: true },
          rawMaterialStatus: { type: String, required: false } //In-Stock / Out-of-Stock
          
          // rawMaterialLastName: { type: String, required: true },
          // rawMaterialMobile: { type: Number, required: true },
          // rawMaterialEmail: { type: String, required: true },
          // rawMaterialDOB: { type: Date, required: true },
          // rawMaterialGender: { type: String, required: true },
          // rawMaterialQualification: { type: String, required: false },
          // rawMaterialAddress: { type: String, required: false },
        },
        { timestamps: true }
      )
    );
    return EmployeeModel;
  };