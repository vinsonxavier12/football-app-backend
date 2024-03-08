const express = require("express");
const morgan = require("morgan");

const UserRouter = require("./Routers/UserRouter");
const AuthRouter = require("./Routers/AuthRouter");
const ErrorController = require("./Controllers/ErrorController");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);

app.use(ErrorController);

module.exports = app;
