// const Message = require("../db/models/message");
// const Channel = require("../db/models/channel");

const userPool = {};

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id, " has made a persistent connection to the server!");

    socket.on("user-joined", (user) => {
      userPool[user] = socket.id;
      socket.broadcast.emit("user-joined", user);
    });
  });
};
