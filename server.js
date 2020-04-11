import http from "http";
const socketIo = require("socket.io");
const app = require("./app");
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  const { id } = socket.client;
  console.log(`User Connected: ${id}`);

  socket.on("/join", function ({ nickname, room }) {
    console.log(`join command received for room ${room}`);

    socket.join(room, () => {
      let rooms = Object.keys(socket.rooms);
      console.log(rooms);
      io.to(room).emit("/join", `${nickname} has joined the room.`); // broadcast to everyone in the room
    });
  });

  socket.on("/leave", function ({ nickname, room }) {
    console.log(`leave command received for room ${room}`);

    socket.leave(room, () => {
      let rooms = Object.keys(socket.rooms);
      console.log(rooms);
      io.to(room).emit("/leave", `${nickname} has left the room.`); // broadcast to everyone in the room
    });
  });

  socket.on("chat message", function ({ nickname, msg }) {
    io.emit("chat message", { nickname, msg });
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    socket.emit("broadcast", "user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
