const express = require("express");

const playerController = require("../Controllers/playerController");

const router = express.Router();
router
  .route("/")
  .get(playerController.getAllPlayers)
  .post(playerController.createPlayer);
router
  .route("/:id")
  .get(playerController.getPlayer)
  .put(playerController.updatePlayer)
  .delete(playerController.deletePlayer);

module.exports = router;
