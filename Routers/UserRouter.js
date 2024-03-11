const express = require("express");

const AuthController = require("../Controllers/AuthController");
const UserController = require("../Controllers/UserController");

const router = express.Router();
router.get("/", AuthController.protect, UserController.getAllUsers);

module.exports = router;
