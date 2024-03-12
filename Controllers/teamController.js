const factory = require("./handlerFactory");
const Team = require("../Models/teamModel");

exports.createTeam = factory.createOne(Team);
exports.getAllTeams = factory.getAll(Team);
exports.getTeam = factory.getOne(Team, null, {
  path: "players",
  select: "-team",
});
exports.updateTeam = factory.updateOne(Team);
exports.deleteTeam = factory.deleteOne(Team);
