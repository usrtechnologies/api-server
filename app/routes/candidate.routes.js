module.exports = (app) => {
  const candidate = require("../controllers/candidate.controller");
  var router = require("express").Router();

  // Create new Candidate
  router.post("/", candidate.create);

  // Read all Candidate by status
  router.get("/:candidateStatus", candidate.findAllByStatus);

  // Read One Candidate by id
  router.get("/:id", candidate.findOne);

  // Update One Candidate
  router.put("/:id", candidate.update);

  // Schedule Candidate
  router.put("/schedule/:id", candidate.schedule);

  // Intrested Candidate
  router.put("/intrested/:id", candidate.intrested);

  // Not Intrested Candidate
  router.put("/notIntrested/:id", candidate.notIntrested);

  // On Hold Candidate
  router.put("/onHold/:id", candidate.onHold);

  // Not Received Candidate
  router.put("/notReceived/:id", candidate.notReceived);

  // Delete One Candidate
  router.delete("/:id", candidate.delete);

  // Delete All Candidate
  router.delete("/", candidate.deleteAll);

  app.use("/api/candidate", router);
};
