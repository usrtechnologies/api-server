module.exports = mongoose => {
    const EmployeeModel = mongoose.model(
      "table",
      mongoose.Schema(
        {
          tableNumber: { type: Number, required: true },
          tableCapacity: { type: Number, required: true },
          // tableLastName: { type: String, required: true },
          // tableMobile: { type: Number, required: true },
          // tableEmail: { type: String, required: true },
          // tableDOB: { type: Date, required: true },
          // tableGender: { type: String, required: true },
          // tableQualification: { type: String, required: false },
          // tableAddress: { type: String, required: false },
          tableStatus: { type: String, required: false }
        },
        { timestamps: true }
      )
    );
    return EmployeeModel;
  };