import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://backendchat2.herokuapp.com:3001");
//variavel socket Deve apontar para o IP do servidor

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [id, setID] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>FakeZap</h3>
          <input
            type="text"
            placeholder="Username..."
            onChange={(event) => {
              setUsername(event.target.value);
              setID(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && joinRoom();
            }}
          />
          <button onClick={joinRoom}>Converse!</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} id={id} />
      )}
    </div>
  );
}

export default App;
