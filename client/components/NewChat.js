import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket";
import { sendMessage, receiveMessage, fetchMessages } from "../store/chatSlice";

function NewChat() {
  const dispatch = useDispatch();
  const { messageList } = useSelector((state) => state.chat);
  const [currentMessage, setCurrentMessage] = useState("");

  const user = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.project.selectedProject);

  const sendMsg = async () => {
    if (currentMessage !== "") {
      const messageData = {
        author: user.firstName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        projectId: id,
      };

      dispatch(sendMessage(messageData));
      await socket.emit("send_message", messageData);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      dispatch(receiveMessage(data));
    });
  }, [socket]);

  useEffect(() => {
    dispatch(fetchMessages());
  }, []);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, i) => {
            return (
              <div
                key={i}
                className="message"
                id={user.firstName === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMsg();
          }}
        />
        <button onClick={sendMsg}>&#9658;</button>
      </div>
    </div>
  );
}

export default NewChat;
