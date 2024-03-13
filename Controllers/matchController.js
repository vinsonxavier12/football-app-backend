const factory = require("./handlerFactory");
const Match = require("../Models/matchModel");
const CatchAsyncError = require("../utilities/CatchAsyncError");

exports.createMatch = factory.createOne(Match);
// By using multiple objects of array we can populate multiple fields
exports.getAllMatches = factory.getAll(Match, null, [
  {
    path: "homeTeam",
    select: "name shortname",
  },
  {
    path: "awayTeam",
    select: "name shortname",
  },
]);

exports.getMatch = factory.getOne(Match, null, [
  {
    path: "homeTeam awayTeam",
    select: "name shortname",
    populate: {
      path: "players",
      model: "Player",
      select: "_id name -team",
    },
  },
]);

exports.getMatchesByDate = CatchAsyncError(async (req, res, next) => {
  const matches = Match.find({});
});
