const mongoose = require("mongoose");
const CandidateModel = require("../models/candidate.model")(mongoose);

// Create new Candidate
exports.create = (req, res) => {
  // Validate request
  if (!req.body.candidateMobile) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Candidate
  const candidate = new CandidateModel({
    candidateFirstName: req.body.candidateFirstName,
    candidateLastName: req.body.candidateLastName,
    candidateEmail: req.body.candidateEmail,
    candidateMobile: req.body.candidateMobile,
    candidateDOB: req.body.candidateDOB,
    candidateGender: req.body.candidateGender,
    candidateQualification: req.body.candidateQualification
      ? req.body.candidateQualification
      : "",
    candidateStreamBranch: req.body.candidateStreamBranch
      ? req.body.candidateStreamBranch
      : "",
    candidateEducationYear: req.body.candidateEducationYear
      ? req.body.candidateEducationYear
      : "",
    candidatePassoutYear: req.body.candidatePassoutYear
      ? req.body.candidatePassoutYear
      : "",
    candidateCollageName: req.body.candidateCollageName
      ? req.body.candidateCollageName
      : "",
    candidateStatus: "created",
  });
  // Save Candidate in the database
  candidate
    .save(candidate)
    .then(() => {
      res.status(200).send({
        message: "Candidate added successfully.",
      });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).send({
        message: err.message || "Internal Server Error.",
      });
    });
};

// Read all Candidate by status
exports.findAllByStatus = (req, res) => {
  CandidateModel.find({candidateStatus: req.params.candidateStatus})
    .then((data) => {
      res.status(200).send({
        success: true,
        message: data.length
          ? "Candidates data found."
          : "No Candidates data available.",
        data: data,
        length: data.length,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Internal Server Error.",
      });
    });
};

// Read One Candidate by id
exports.findOne = (req, res) => {
  const id = req.params.id;
  CandidateModel.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found candidate with id " + id });
      else
        res.status(200).send({
          success: true,
          message: "Candidate data found.",
          data: data,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving candidate with id=" + id });
    });
};

// Update a Candidate by the id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  CandidateModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Candidate with id=${id}. Maybe Candidate was not found!`,
        });
      } else
        res.status(200).send({
          success: true,
          message: "Candidate was updated successfully1.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Candidate with id=" + id,
      });
    });
};

// Schedule Candidate
exports.schedule = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to schedule can not be empty!",
    });
  }
  const id = req.params.id;
  CandidateModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot move candidate to schedule with id=${id}. Maybe Candidate was not found!`,
        });
      } else
        res.status(200).send({
          success: true,
          message: "Candidate was schedule successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Candidate with id=" + id,
      });
    });
};

// Intrested Candidate
exports.intrested = (req, res) => {
  console.log("req", req);
  if (!req.body) {
    return res.status(400).send({
      message: "Data to intrested can not be empty!",
    });
  }
  const id = req.params.id;
  CandidateModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot move candidate to intrested with id=${id}. Maybe Candidate was not found!`,
        });
      } else
        res.status(200).send({
          success: true,
          message: "Candidate moved to intrested successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Candidate with id=" + id,
      });
    });
};

// Not Intrested Candidate
exports.notIntrested = (req, res) => {
  console.log("req", req);
  if (!req.body) {
    return res.status(400).send({
      message: "Data to not intrested can not be empty!",
    });
  }
  const id = req.params.id;
  CandidateModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot move candidate to not intrested with id=${id}. Maybe Candidate was not found!`,
        });
      } else
        res.status(200).send({
          success: true,
          message: "Candidate moved to not intrested successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Candidate with id=" + id,
      });
    });
};

// On Hold Candidate
exports.onHold = (req, res) => {
  console.log("req", req);
  if (!req.body) {
    return res.status(400).send({
      message: "Data to on hold can not be empty!",
    });
  }
  const id = req.params.id;
  CandidateModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot move candidate to on hold with id=${id}. Maybe Candidate was not found!`,
        });
      } else
        res.status(200).send({
          success: true,
          message: "Candidate moved to on hold successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Candidate with id=" + id,
      });
    });
};

// Not Received Candidate
exports.notReceived = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to not received can not be empty!",
    });
  }
  const id = req.params.id;
  CandidateModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot move candidate to not received with id=${id}. Maybe Candidate was not found!`,
        });
      } else
        res.status(200).send({
          success: true,
          message: "Candidate moved to not received successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Candidate with id=" + id,
      });
    });
};

// Delete a Candidate by id
exports.delete = (req, res) => {
  const id = req.params.id;
  CandidateModel.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Candidate with id=${id}. Maybe Candidate was not found!`,
        });
      } else {
        res.send({
          message: "Candidate was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Candidate with id=" + id,
      });
    });
};

// Delete all Candidates from the database.
exports.deleteAll = (req, res) => {
  CandidateModel.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Candidates were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Candidates.",
      });
    });
};
