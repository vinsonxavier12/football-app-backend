const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Player = require("./playerModel");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A user must have a name"],
    },
    role: {
      type: String,
      required: [true, "A user must have a role"],
      enum: {
        values: ["player", "manager", "admin", "team-admin", "staff", "user"],
        message:
          "Role must either be `player`, `manager`, `admin`, `team-admin`, `staff` or `user` ",
      },
    },
    email: {
      type: String,
      required: [true, "A user must have an email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Email is invalid"],
    },
    password: {
      type: String,
      // If we use select false, it is throwing error on controller
      // query projection. Use with warning
      select: false,
      required: [true, "A user must have a password"],
    },
    passwordUpdatedAt: {
      type: Date,
    },
  },
  { versionKey: false }
);

userSchema.statics.getSignedJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

userSchema.methods.hasPasswordChangedAfterTokenIssued = function (
  jwtTimeStamp
) {
  if (this.passwordUpdatedAt) {
    return jwtTimeStamp < this.passwordUpdatedAt.getTime() / 1000;
  }
  return false;
};

userSchema.methods.isPasswordValid = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

// If role is player, adding in player collection
userSchema.pre("save", async function (next) {
  if (!this.role === "player") return next();
  await Player.create(this);
});

module.exports = mongoose.model("User", userSchema, "Users");
