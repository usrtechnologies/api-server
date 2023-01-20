module.exports = (mongoose) => {
  const TechnologyModel = mongoose.model(
    "technology",
    mongoose.Schema(
      {
        technologyID: { type: String, required: true },
        technologyName: { type: String, required: true }
      },
      { timestamps: true }
    )
  );
  return TechnologyModel;
};
