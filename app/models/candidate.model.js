module.exports = mongoose => {
    const CandidateModel = mongoose.model(
      "candidate",
      mongoose.Schema(
        {
          candidateFirstName: { type: String, required: true },
          candidateLastName: { type: String, required: true },
          candidateEmail: { type: String, required: true },
          candidateMobile: { type: Number, required: true },
          candidateDOB: { type: Date, required: true },
          candidateGender: { type: String, required: true },
          candidateQualification: { type: String, required: false },
          candidateStreamBranch: { type: String, required: false },
          candidateEducationYear: { type: String, required: false },
          candidatePassoutYear: { type: Number, required: false },
          candidateCollageName: { type: String, required: false },
          candidateStatus: { type: String, required: true }
        },
        { timestamps: true }
      )
    );
    return CandidateModel;
  };