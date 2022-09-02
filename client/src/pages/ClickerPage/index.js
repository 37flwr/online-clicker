import { useEffect, useState } from "react";
import useSWR from "swr";
import socket from "../../utils/socket";
import { registerClick } from "../../utils/socketActions";
import "./styles.scss";

const ClickerPage = () => {
  const roomId = new URLSearchParams(window.location.search).get("roomId");
  socket.emit("joinRoom", roomId);
  const { data } = useSWR([
    "http://localhost:8080/roomDetails",
    [["roomId", roomId]],
  ]);

  const [clicksLeft, setClicksLeft] = useState(0);

  useEffect(() => {
    setClicksLeft(data?.clicksLeft);

    socket.on("clickRegistered", (data) => {
      setClicksLeft(data);
    });

    return () => {
      socket.emit("leaveRoom", roomId);
    };
  }, [data, roomId]);

  return !!data ? (
    <div>
      {data.id}
      <br />
      {clicksLeft}
      <div>
        <button onClick={() => registerClick(socket, roomId)}>Click</button>
      </div>
    </div>
  ) : (
    <div>No such room exists</div>
  );
};

export default ClickerPage;
