import mongoose from "mongoose";
import { RoomSchema } from "../models/roomModel";

const Room = mongoose.model("Room", RoomSchema);

export const addNewRoom = (req, res) => {
  let newRoom = new Room(req.body);

  newRoom.save((err, room) => {
    if (err) {
      res.send(err);
    }
    res.json(room);
  });
};

export const getRooms = (req, res) => {
  Room.find({}, (err, room) => {
    if (err) {
      res.send(err);
    }
    res.json(room);
  });
};

export const getRoomByID = (req, res) => {
  Room.findById(req.params.id, (err, room) => {
    if (err) {
      res.send(err);
    }
    if (room) {
      res.json(room);
    } else {
      res.status(404).send("Room not found");
    }
  });
};

export const updateRoom = (req, res) => {
  Room.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, useFindAndModify: false },
    (err, room) => {
      if (err) {
        res.send(err);
      }
      res.json(room);
    }
  );
};
