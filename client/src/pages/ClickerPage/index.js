import axios from "axios";
import React, { useEffect, useState } from "react";
import socket from "../../socket";

const registerClick = (roomId) => {
  socket.emit("registerClick", roomId);
};

const ClickerPage = () => {
  const roomId = new URLSearchParams(window.location.search).get("title");
  const [clicksLeft, setClicksLeft] = useState(0);
  const [noRoom, setNoRoom] = useState(false);
  socket.emit("joinRoom", roomId);

  useEffect(() => {
    axios
      .get("http://localhost:8080/roomClicks", { params: { roomId } })
      .then((res) => {
        setClicksLeft(res.data);
      });

    socket.on("clickRegistered", (data) => {
      setClicksLeft(data);
    });

    socket.on("noRoom", () => {
      setNoRoom((currState) => !currState);
    });

    return () => {
      socket.emit("leaveRoom", roomId);
    };
  }, [roomId]);
  return noRoom ? (
    <div>No such room exists</div>
  ) : (
    <div>
      {clicksLeft}
      <div>
        <button onClick={() => registerClick(roomId)}>Click</button>
      </div>
    </div>
  );
};

export default ClickerPage;
