import express from "express";
import data from "./mocks/rooms.json";

const app = express();
const PORT = 5000;

app.get("/api/rooms", (req, res) =>
  // get data first
  res.json(data)
);
app.get("/api/chatlogs/:id", (req, res) => {
  const filtered = data.rooms.filter(room => room.RoomID == req.params.id);
  res.json(filtered[0].ChatMessages);
});

app.get("/api/grid/:id", (req, res) => {
  const filtered = data.rooms.filter(room => room.RoomID == req.params.id);
  res.json(filtered[0].Grid);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(data);
});
