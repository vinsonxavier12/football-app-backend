const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const UserRouter = require("./Routers/UserRouter");
const AuthRouter = require("./Routers/AuthRouter");
const playerRouter = require("./Routers/playerRouter");
const leagueRouter = require("./Routers/leagueRouter");
const teamRouter = require("./Routers/teamRouter");
const matchRouter = require("./Routers/matchRouter");
const ErrorController = require("./Controllers/ErrorController");

const app = express();
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);
app.use("/api/players", playerRouter);
app.use("/api/leagues", leagueRouter);
app.use("/api/teams", teamRouter);
app.use("/api/matches", matchRouter);

app.use(ErrorController);

module.exports = app;
