const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const PORT = 3000;

server.listen(PORT);
console.log(`Listening on port ${PORT}...`);

let readyPlayersCount = 0;

io.on("connection", (socket) => {
  console.log("a user is connected. ID:", socket.id);

  socket.on("ready", () => {
    console.log("a player is ready. ID:", socket.id);
    readyPlayersCount += 1;

    if (readyPlayersCount === 2) {
      console.log(socket.id);
      io.emit("startGame", socket.id);
    }
  });

  socket.on("paddleMove", (paddleData) => {
    socket.broadcast.emit("paddleMove", paddleData);
  });

  socket.on("ballMove", (ballData) => {
    socket.broadcast.emit("ballMove", ballData);
  });
});
