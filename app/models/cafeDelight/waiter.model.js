module.exports = mongoose => {
    const EmployeeModel = mongoose.model(
      "waiter",
      mongoose.Schema(
        {
          waiterId: { type: String, required: true },
          waiterFirstName: { type: String, required: true },
          waiterLastName: { type: String, required: true },
          waiterEmail: { type: String, required: false },
          waiterMobile: { type: String, required: true },
          waiterAdhar: { type: Number, required: true },
          waiterAddress: { type: String, required: true },
          waiterDOB: { type: String, required: true },
          waiterGender: { type: String, required: true },
          waiterStatus: { type: String, required: false } // Present | Absent | Leave
          // waiterLastName: { type: String, required: true },
          // waiterMobile: { type: Number, required: true },
          // waiterEmail: { type: String, required: true },
          // waiterQualification: { type: String, required: false },
          // waiterAddress: { type: String, required: false },
        },
        { timestamps: true }
      )
    );
    return EmployeeModel;
  };