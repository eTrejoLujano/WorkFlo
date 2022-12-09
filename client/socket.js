import io from "socket.io-client";
import store from "./store";
import { userJoined } from "./store/chatSlice";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("I am now connected to the server!");
  socket.on("user-joined", (joiner) => {
    store.dispatch(userJoined(joiner));
  });
});

export default socket;
