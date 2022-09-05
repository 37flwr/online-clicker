import { Button } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import useSWR from "swr";
import Loading from "../../components/Loading";
import socket from "../../utils/socket";
import { registerClick } from "../../utils/socketActions";
import "./styles.scss";

const ClickerPage = () => {
  const roomId = new URLSearchParams(window.location.search).get("roomId");
  socket.emit("joinRoom", roomId);
  socket.emit("getRoomUsers", roomId);
  const { data } = useSWR([
    "http://localhost:8080/roomDetails",
    [["roomId", roomId]],
  ]);

  const [clicksLeft, setClicksLeft] = useState(0);
  const [activeUsers, setActiveUsers] = useState(1);

  useEffect(() => {
    setClicksLeft(data?.remainingClicks);

    socket.on("clickRegistered", (data) => {
      setClicksLeft(data);
    });

    socket.on("registerUser", (data) => {
      setActiveUsers(data);
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
      <br />
      <Suspense fallback={<Loading />}>{activeUsers}</Suspense>
      <div>
        <Button
          variant="contained"
          onClick={() => registerClick(socket, roomId)}
        >
          Click
        </Button>
      </div>
    </div>
  ) : (
    <div>No such room exists</div>
  );
};

export default ClickerPage;
