const CatchAsyncError = require("../utilities/CatchAsyncError");
const factory = require("./handlerFactory");
const User = require("../Models/UserModel");
const Player = require("../Models/playerModel");

exports.getAllPlayers = factory.getAll(Player);
exports.createPlayer = factory.createOne(Player);
exports.getPlayer = factory.getOne(Player);
exports.updatePlayer = factory.updateOne(Player);
exports.deletePlayer = factory.deleteOne(Player);
