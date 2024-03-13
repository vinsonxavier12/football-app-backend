const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A match must have a name"],
    },
    homeTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "A match must have a homeTeam"],
    },
    awayTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "A match must have a awayTeam"],
    },
    date: {
      type: Date,
      required: [true, "A match must have a date"],
    },
    venue: {
      stadium: {
        type: String,
        required: [true, "A match must have a stadium"],
      },
      location: {
        type: String,
        required: [true, "A match must have a location"],
      },
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

const Match = mongoose.model("Match", matchSchema, "Matches");
module.exports = Match;
