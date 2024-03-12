const express = require("express");

const leagueController = require("../Controllers/leagueController");

const router = express.Router();

router.route("/").post(leagueController.createLeague);

module.exports = router;
