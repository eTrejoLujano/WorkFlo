import io from "socket.io-client";
import store from "./store";
import { userJoined, userLeft } from "./store/chatSlice";
import { toast } from "react-toastify";
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
  socket.on("user-assigned-task", (task) => {
    toast(`You've been assigned to "${task.task}" on ${task.projectTitle}`);
  });
  socket.on("user-removed-from-task", (task) => {
    toast(`You've been removed from "${task.task}" on ${task.projectTitle}`);
  });
});

export default socket;
