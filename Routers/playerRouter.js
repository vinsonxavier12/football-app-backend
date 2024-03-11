const express = require("express");

const playerController = require("../Controllers/playerController");

const router = express.Router();
router.route("/").get(playerController.getAllPlayers);

module.exports = router;
