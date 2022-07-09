const api = require("./api.js");
const server = require("http").createServer(api);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const PORT = 3000;
const sockets = require("./sockets.js");

server.listen(PORT);
console.log(`Listening on port ${PORT}...`);

sockets.listen(io);

