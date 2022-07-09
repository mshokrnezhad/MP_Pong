let readyPlayersCount = 0;

function listen(io) {
  const pongNamespace = io.of("/pong");

  pongNamespace.on("connection", (socket) => {
    console.log("user is connected. ID:", socket.id);

    socket.on("ready", () => {
      console.log("user is ready. ID:", socket.id);
      readyPlayersCount += 1;

      if (readyPlayersCount % 2 === 0) {
        console.log("number of ready players is", readyPlayersCount);
        pongNamespace.emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.broadcast.emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.broadcast.emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(
        "user is disconnected. ID:",
        socket.id,
        "( reason:",
        reason,
        ")"
      );
    });
  });
}

module.exports = { listen };
