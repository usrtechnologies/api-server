module.exports = mongoose => {
    const QualificationModel = mongoose.model(
      "qualification",
      mongoose.Schema(
        {
          qualificationID:  { type: String, required: true },
          qualificationName:  { type: String, required: true }
        },
        { timestamps: true }
      )
    );
    return QualificationModel;
  };