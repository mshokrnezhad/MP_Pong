let readyPlayersCount = 0;

function listen(io) {
  const pongNamespace = io.of("/pong");

  pongNamespace.on("connection", (socket) => {
    console.log("user is connected. ID:", socket.id);
    let room;

    socket.on("ready", () => {
      room = "room" + Math.floor(readyPlayersCount / 2);
      socket.join(room);
      console.log("user is ready. ID:", socket.id, room);

      readyPlayersCount += 1;

      if (readyPlayersCount % 2 === 0) {
        console.log("number of ready players is", readyPlayersCount);
        pongNamespace.in(room).emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.to(room).emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.to(room).emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(
        "user is disconnected. ID:",
        socket.id,
        "( reason:",
        reason,
        ")"
      );
      socket.leave(room);
    });
  });
}

module.exports = { listen };
