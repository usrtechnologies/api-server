module.exports = (mongoose) => {
  const GradeModel = mongoose.model(
    "grade",
    mongoose.Schema(
      {
        gradeID: { type: String, required: true },
        gradeName: { type: String, required: true },
        gradeValue: { type: Number, required: true },
        gradeTechnology: { type: Array, required: false }
      },
      { timestamps: true }
    )
  );
  return GradeModel;
};
