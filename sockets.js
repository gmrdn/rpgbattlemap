import mongoose from "mongoose";
import { RoomSchema } from "./src/models/roomModel";

const Room = mongoose.model("Room", RoomSchema);
const socketIo = require("socket.io");

export function listen(server) {
  const io = socketIo.listen(server);

  io.on("connection", (socket) => {
    const { id } = socket.client;
    console.log(`User Connected: ${id}`);

    socket.on("/join", function ({ nickname, room }) {
      console.log(`join command received for room ${room}`);

      socket.join(room, () => {
        let rooms = Object.keys(socket.rooms);
        console.log(rooms);
        io.to(room).emit("/join", `${nickname} has joined the room.`);
      });
    });

    socket.on("/leave", function ({ nickname, room }) {
      console.log(`leave command received for room ${room}`);

      socket.leave(room, () => {
        let rooms = Object.keys(socket.rooms);
        console.log(rooms);
        io.to(room).emit("/leave", `${nickname} has left the room.`);
      });
    });

    socket.on("/msg", function ({ room, nickname, message }) {
      let newMessage = { nickname: nickname, message: message };
      console.log(
        `Received message ${message} from ${nickname} in room ${room}`
      );

      Room.findOneAndUpdate(
        { _id: room },
        {
          $push: {
            chatMessages: newMessage,
          },
        },
        { new: true, useFindAndModify: false },
        (err, _) => {
          if (err) {
            console.log(err);
          }
          console.log(`Database updated : added message in room ${room}`);
          io.to(room).emit("/msg", newMessage);
        }
      );
    });

    socket.on("moveToken", function ({ room, user, tokenId, x, y }) {
      console.log(
        `Received moveToken from ${user} in room ${room} for token id ${tokenId} to ${x}, ${y}`
      );

      Room.findOneAndUpdate(
        { _id: room, "grid.tokens._id": tokenId },
        {
          $set: {
            "grid.tokens.$.x": x,
            "grid.tokens.$.y": y,
          },
        },
        { new: true, useFindAndModify: false },
        (err, _) => {
          if (err) {
            console.log(err);
          }
          console.log(
            `Database updated : moved token ${tokenId} in room ${room}`
          );
          io.to(room).emit("moveToken", { tokenId, x, y });
        }
      );
    });

    socket.on("deleteToken", function ({ room, user, tokenId }) {
      console.log(
        `Received deleteToken from ${user} in room ${room} for token id ${tokenId}`
      );

      Room.findOneAndUpdate(
        { _id: room },
        {
          $pull: {
            "grid.tokens": { _id: tokenId },
          },
        },
        { new: true, useFindAndModify: false },
        (err, _) => {
          if (err) {
            console.log(err);
          }
          console.log(
            `Database updated : deleted token ${tokenId} from room ${room}`
          );
          io.to(room).emit("deleteToken", { tokenId });
        }
      );
    });

    socket.on("addToken", function ({ room, user, token }) {
      console.log(
        `Received addToken from ${user} in room ${room} for token named ${token.name}`
      );

      Room.findOneAndUpdate(
        { _id: room },
        {
          $push: {
            "grid.tokens": token,
          },
        },
        { new: true, useFindAndModify: false },
        (err, updatedRoom) => {
          if (err) {
            console.log(err);
          }
          let newToken =
            updatedRoom.grid.tokens[updatedRoom.grid.tokens.length - 1];
          console.log(
            `Database updated : added token with name ${newToken.name} and id ${newToken._id} from room ${room}`
          );
          io.to(room).emit("addToken", newToken);
        }
      );
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      socket.emit("broadcast", "user disconnected");
    });
  });
}
