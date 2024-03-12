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

// Query middleware for populating team by default
playerSchema.pre(/^find/, function (next) {
  // If the query already has a populate object, neglecting populating
  // generically without select specified
  // Higher preference for specific populate methods rather than generic
  if (this._mongooseOptions.populate) return next();
  this.populate({ path: "team" });
  next();
});

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
