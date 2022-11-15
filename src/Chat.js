import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Mp3 from "./sounds/button.mp3";

<audio id="new-message" src="./sounds/new.wav" preload="auto"></audio>;
<audio id="eee" src="./sounds/sent.wav.wav" preload="auto"></audio>;
<audio
  id="sent"
  src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
></audio>;

function Chat({ socket, username, room }) {
  const audioRef = React.createRef();
  const handleKeydown = (event) => {
    if (event.repeat) {
      return;
    }
    audioRef.current.play();
  };

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <audio src={Mp3} ref={audioRef} />

      <div className="chat-header">
        <p>Live Chat in Room: {room}</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="author">{messageContent.author}</p>
                    <p id="time">
                      &nbsp;
                      {messageContent.time}
                    </p>
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
          placeholder="Digite sua mensagem..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />

        <button onClick={sendMessage}>&#10148;</button>
      </div>
    </div>
  );
}

export default Chat;
