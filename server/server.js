import express from "express";
import routes from "./src/routes/roomRoutes";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import data from "./mocks/rooms.json";

const app = express();
const PORT = 5000;

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

routes(app);

// app.get("/api/rooms", (req, res) =>
//   // get data first
//   res.json(data)
// );
app.get("/api/chatlogs/:id", (req, res) => {
  const filtered = data.rooms.filter(room => room._id == req.params.id);
  res.json(filtered[0].chatMessages);
});

app.get("/api/grid/:id", (req, res) => {
  const filtered = data.rooms.filter(room => room._id == req.params.id);
  res.json(filtered[0].grid);
});

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send(`Whoops ! ${err.stack}`);
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
