const CatchAsyncError = require("../utilities/CatchAsyncError");
const User = require("../Models/UserModel");

exports.getAllPlayers = CatchAsyncError(async (req, res, next) => {
  const players = await User.find({ role: "player" }, { role: 0 });
  res.status(200).json({
    results: players.length,
    players,
  });
});
