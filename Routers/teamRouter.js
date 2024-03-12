const express = require("express");

const teamController = require("../Controllers/teamController");

const router = express.Router();
router
  .route("/")
  .post(teamController.createTeam)
  .get(teamController.getAllTeams);
router
  .route("/:id")
  .get(teamController.getTeam)
  .put(teamController.updateTeam)
  .delete(teamController.deleteTeam);

module.exports = router;
