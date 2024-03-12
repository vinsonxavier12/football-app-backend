const factory = require("./handlerFactory");
const League = require("../Models/leagueModel");

exports.createLeague = factory.createOne(League);
