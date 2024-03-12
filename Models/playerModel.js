const mongoose = require("mongoose");

const Team = require("./teamModel");

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A player must have a name"],
    },
    team: {
      type: mongoose.Schema.ObjectId,
      ref: "Team",
      required: [true, "A player must have a team associated"],
    },
  },
  { versionKey: false }
);

// After creation of a player, adding the
// player to players array in team model
playerSchema.post("save", async function () {
  await Team.findByIdAndUpdate(this.team, { $addToSet: { players: this._id } });
});

// After deletion of a player, removing the player
// from players array in team model
playerSchema.post("remove", async function () {
  await Team.findByIdAndUpdate(this.team, { $pull: { players: this._id } });
});

const Player = mongoose.model("Player", playerSchema, "Players");
module.exports = Player;
