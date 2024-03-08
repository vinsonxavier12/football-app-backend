const User = require("../Models/UserModel");
const CatchAsyncError = require("../utilities/CatchAsyncError");

exports.getAllUsers = CatchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ results: users.length, users });
});
