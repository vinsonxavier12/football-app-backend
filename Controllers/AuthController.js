const jwt = require("jsonwebtoken");

const User = require("../Models/UserModel");
const CatchAsyncError = require("../utilities/CatchAsyncError");
const AppError = require("../utilities/appError");

// For authorizing protected routes
exports.protect = CatchAsyncError(async (req, res, next) => {
  // Checking cookie in request and raising error if not found
  if (!req.cookies.jwt) return next("Login to get access for this route");
  // Decoding jwt inside cookie and if signature failed jwt throws error
  const jwtDecoded = jwt.verify(req.cookies.jwt, process.env.JWT_KEY);
  // Fetching the user from DB and if not found throws an error
  const user = await User.findById(jwtDecoded.id);
  if (!user) return next("No user found from token ID. Please login again");
  // Checking if user have changed password after token is issued
  // In that case, log out user
  if (user.hasPasswordChangedAfterTokenIssued(jwtDecoded.iat))
    return next("Your password has been changed. Please login again");

  // User is authenticated, so adding user in req object for further use
  req.user = user;
  next();
});

// Create a signed jwt and sending it on response cookie
exports.createAndSendCookie = (user, statusCode, res) => {
  // Getting signed token from static method and setting cookie options
  const token = User.getSignedJwtToken(user._id);
  const cookieOptions = {
    secure: false,
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRY_IN_DAYS * 24 * 60 * 60 * 1000,
    ),
  };
  // Setting user password to undefined to prevent displaying password
  // But got stored in DB
  if (user.password) user.password = undefined;
  // Sending cookie in response and token
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode || 200).json({ token });
};

exports.signup = CatchAsyncError(async (req, res, next) => {
  const user = (await User.create(req.body)).toJSON();
  this.createAndSendCookie(user, 201, res);
});

exports.login = CatchAsyncError(async (req, res, next) => {
  // If there is not email or password throwing error
  if (!req.body.email || !req.body.password)
    return next("Missing email or password");
  // Finding user with password to validate password
  const user = await User.findOne({ email: req.body.email }).select(
    "+password",
  );
  // Checking is password valid by schema method
  // If invalid or user not found throwing error invalid credentials
  // Clearing cookie if credentials are invalid
  if (!user || !(await user.isPasswordValid(req.body.password))) {
    res.clearCookie("jwt");
    return next(new AppError("Invalid credentials", 400));
  }

  // User is authenticated, creating cookie and sending
  this.createAndSendCookie(user, 200, res);
});
