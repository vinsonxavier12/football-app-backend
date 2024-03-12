const factory = require("./handlerFactory");
const Player = require("../Models/playerModel");

exports.getAllPlayers = factory.getAll(Player, null, {
  path: "team",
  select: "name shortname",
});
exports.createPlayer = factory.createOne(Player);
exports.getPlayer = factory.getOne(Player, null, {
  path: "team",
  select: "-players",
});
exports.updatePlayer = factory.updateOne(Player);
exports.deletePlayer = factory.deleteOne(Player);
