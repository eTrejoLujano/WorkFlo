//userPool collects the userId and tracks who is in which project and makes a map for their socketIds so individuals (or all members of a specific project) can be targeted for direct messages/notifications

//const userPool={ProjectID:{UserId:SocketId}}

const userPool = {};

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id, " has made a persistent connection to the server!");

    socket.on("user-joined", (joiner) => {
      if (userPool[joiner.projectId]) {
        userPool[joiner.projectId][joiner.userId] = socket.id;
      } else {
        userPool[joiner.projectId] = {};
        userPool[joiner.projectId][joiner.userId] = socket.id;
      }

      io.emit("user-joined", joiner);
    });

    socket.on("send_message", (data) => {
      socket.broadcast.emit("receive_message", data);
    });
  });
};
