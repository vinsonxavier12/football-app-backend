const mongoose = require("mongoose");
const validator = require("validator");

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
      // unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Email is invalid"],
    },
    password: {
      type: String,
      select: false,
      required: [true, "A user must have a password"],
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema, "Users");
