import { useEffect, useState } from "react";
import useSWR from "swr";
import socket from "../../utils/socket";
import { registerClick } from "../../utils/socketActions";
import "./styles.scss";

const ClickerPage = () => {
  const roomId = new URLSearchParams(window.location.search).get("title");
  socket.emit("joinRoom", roomId);
  const { data } = useSWR([
    "http://localhost:8080/roomDetails",
    [["roomId", roomId]],
  ]);

  const [clicksLeft, setClicksLeft] = useState(0);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    setClicksLeft(data?.clicksLeft);
    setRoom(data?.name);

    socket.on("clickRegistered", (data) => {
      setClicksLeft(data);
    });

    return () => {
      socket.emit("leaveRoom", roomId);
    };
  }, [data]);

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
