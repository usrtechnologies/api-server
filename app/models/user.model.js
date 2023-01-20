module.exports = mongoose => {
    const UserModel = mongoose.model(
      "user",
      mongoose.Schema(
        {
          // userID: { type: String, required: true },
          firstName: { type: String, required: true },
          lastName: { type: String, required: true },
          mobile: { type: Number, required: true },
          email: { type: String, required: false },
          password: { type: String, required: true },

          // userDOB: { type: Date, required: true },
          // userGender: { type: String, required: true },
          // userQualification: { type: String, required: false },
          // userAddress: { type: String, required: false },
          // userStatus: { type: String, required: false }
        },
        { timestamps: true }
      )
    );
    return UserModel;
  };