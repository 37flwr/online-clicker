import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import socket from "../../utils/socket";
import { registerClick } from "../../utils/socketActions";
import "./styles.scss";

const ClickerPage = () => {
  const roomId = new URLSearchParams(window.location.search).get("title");
  const [clicksLeft, setClicksLeft] = useState(0);
  const [room, setRoom] = useState(null);
  socket.emit("joinRoom", roomId);

  // const { data } = useSWR([
  //   "http://localhost:8080/roomDetails",
  //   { params: { roomId } },
  // ]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/roomDetails", { params: { roomId } })
      .then((res) => {
        setClicksLeft(res.data.clicksLeft);
        setRoom(res.data.name);
      });

    socket.on("clickRegistered", (data) => {
      setClicksLeft(data);
    });

    return () => {
      socket.emit("leaveRoom", roomId);
    };
  }, [roomId]);
  return (
    <div>
      {room}
      <br />
      {clicksLeft}
      <div>
        <button onClick={() => registerClick(socket, roomId)}>Click</button>
      </div>
    </div>
  );
};

export default ClickerPage;
