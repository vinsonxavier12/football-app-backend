const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A league must have a name"],
    },
    shortname: {
      type: String,
      required: [true, "A league must have a shortname"],
      validate: {
        validator: (value) => /^[A-Z]{1,3}$/.test(value),
        message: (props) =>
          `${props.value} is not a valid format. Please provide an uppercase
          string with maximum 3 characters and no space`,
      },
    },
    league: {
      type: mongoose.Schema.ObjectId,
      ref: "League",
      required: [true, "A team must have a league associated"],
    },
    players: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Player",
      },
    ],
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

teamSchema.virtual("playersCount").get(function () {
  return this.players.length;
});

teamSchema.post(/^find/, function () {
  // console.log(this);
});

const Team = mongoose.model("Team", teamSchema, "Teams");
module.exports = Team;
