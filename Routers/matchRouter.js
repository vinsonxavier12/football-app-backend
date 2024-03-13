const express = require("express");

const matchController = require("../Controllers/matchController");

const router = express.Router();
router
  .route("/")
  .post(matchController.createMatch)
  .get(matchController.getAllMatches);
router.route("/:id").get(matchController.getMatch);

module.exports = router;
