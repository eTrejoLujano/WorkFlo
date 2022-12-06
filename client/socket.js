import io from "socket.io-client";
import store from "./store";

// import store, { gotNewMessageFromServer } from "./store";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("I am now connected to the server!");
  socket.on("user-joined", (user) => {
    window.alert(`${user} has joined.`);
  });
});

export default socket;
