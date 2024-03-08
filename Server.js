require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./App");

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected successfully"));

const port = 5000;
app.listen(port, () => console.log("App is running on port", port));
