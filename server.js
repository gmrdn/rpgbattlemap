import http from "http";
import { listen } from "./sockets";
const app = require("./app");
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

listen(server);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.once("SIGUSR2", function () {
  server.close(function () {
    process.kill(process.pid, "SIGUSR2");
  });
});
