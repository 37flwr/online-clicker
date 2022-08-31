import { useEffect, useState } from "react";
import "./App.scss";
import socket from "./socket";

function App() {
  // const [message, setMessage] = useState("");
  // const [receivedMsg, setReceivedMsg] = useState("");
  // const sendMessage = () => {
  //   socket.emit("send_msg", { message });
  // };

  useEffect(() => {
    // socket.on("receive_msg", (data) => {
    //   setReceivedMsg(data.message);
    // });
  }, []);

  return (
    <div className="App">
      {/* <input onChange={(event) => setMessage(event.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <h1>{receivedMsg}</h1> */}
    </div>
  );
}

export default App;
