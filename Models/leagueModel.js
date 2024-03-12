const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A league must have a name"],
    },
    shortname: {
      type: String,
      required: [true, "A league must have a shortname"],
    },
    nationality: {
      type: String,
      required: [true, "A league must have a nationality"],
    },
    teams: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "",
      },
    ],
  },
  { versionKey: false }
);

const League = mongoose.model("League", leagueSchema, "Leagues");
module.exports = League;
