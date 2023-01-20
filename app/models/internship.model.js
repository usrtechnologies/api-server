module.exports = mongoose => {
    const GradeModel = mongoose.model(
      "internship",
      mongoose.Schema(
        {
          internshipID: { type: String, required: true },
          internshipName: { type: String, required: true },
          internshipAmount: { type: Number, required: true },
          internshipDuration: { type: Number, required: true },
          internshipTechnology: { type: Array, required: false }
        },
        { timestamps: true }
      )
    );
    return GradeModel;
  };