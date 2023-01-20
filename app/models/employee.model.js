module.exports = mongoose => {
    const EmployeeModel = mongoose.model(
      "employee",
      mongoose.Schema(
        {
          employeeID: { type: String, required: true },
          employeeFirstName: { type: String, required: true },
          employeeLastName: { type: String, required: true },
          employeeMobile: { type: Number, required: true },
          employeeEmail: { type: String, required: true },
          employeeDOB: { type: Date, required: true },
          employeeGender: { type: String, required: true },
          employeeQualification: { type: String, required: false },
          employeeAddress: { type: String, required: false },
          employeeStatus: { type: String, required: false }
        },
        { timestamps: true }
      )
    );
    return EmployeeModel;
  };