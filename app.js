import express from "express";
import routes from "./src/routes/roomRoutes";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";

require("dotenv").config();

const app = express();

// mongoose connection
const connectionString =
  "mongodb+srv://admin:" +
  process.env.MONGOPWD +
  "@dndbattlemap-1236i.mongodb.net/test?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// body parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")));

routes(app);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Whoops ! ${err.stack}`);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

module.exports = app;
