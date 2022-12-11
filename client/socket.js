import io from "socket.io-client";
import store from "./store";
import { userJoined, userLeft } from "./store/chatSlice";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("I am now connected to the server!");
  socket.on("user-joined", (userIdsOnline) => {
    store.dispatch(userJoined(userIdsOnline));
  });
  socket.on("user-left", (userIdsOnline) => {
    console.log("userLeft");
    store.dispatch(userLeft(userIdsOnline));
  });
});

export default socket;
