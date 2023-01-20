module.exports = mongoose => {
    const PositionModel = mongoose.model(
      "position",
      mongoose.Schema(
        {
          positionID:  { type: String, required: true },
          positionName:  { type: String, required: true },
          positionType:  { type: String, required: true }
        },
        { timestamps: true }
      )
    );
    return PositionModel;
  };