const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A player must have a name"],
  },
  team: {
    type: String,
  },
});

const Player = mongoose.model("Player", playerSchema, "Players");
module.exports = Player;
