import http from "http";
const socketIo = require("socket.io");
const app = require("./app");
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit("broadcast", "user connected");
  socket.on("chat message", function (msg) {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    socket.emit("broadcast", "user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
