const User = require("../Models/UserModel");
const CatchAsyncError = require("../utilities/CatchAsyncError");

exports.signup = CatchAsyncError(async (req, res, next) => {
  const user = (await User.create(req.body)).lean();
  console.log(user);
  res.status(201).json(user);
});
