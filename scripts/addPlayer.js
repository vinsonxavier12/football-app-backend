const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../Models/UserModel");
const Player = require("../Models/playerModel");

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected successfully!");
  });

(async () => {
  const playersFromUserModel = await User.find({ role: "player" }, { _id: 0 });
  await Player.insertMany(playersFromUserModel);
  console.log("Done");
})();
