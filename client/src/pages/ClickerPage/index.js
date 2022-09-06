import { Suspense, useEffect, useState } from "react";
import useSWR from "swr";
import Enemy from "../../assets/enemy1.png";
import Loading from "../../components/Loading";
import socket from "../../utils/socket";
import { registerClick } from "../../utils/socketActions";
import BGScene from "./components/BGScene";
import HealthBar from "./components/HealthBar";
import SpookyNavBar from "./components/NavBar";
import "./styles.scss";

const ClickerPage = () => {
  const roomId = new URLSearchParams(window.location.search).get("roomId");
  socket.emit("joinRoom", roomId);

  const { data } = useSWR([
    "http://localhost:8080/roomDetails",
    [["roomId", roomId]],
  ]);

  const [clicksLeft, setClicksLeft] = useState(0);
  const [animationPosition, setAnimationPosition] = useState(0);

  useEffect(() => {
    setClicksLeft(data?.remainingClicks);

    socket.on("clickRegistered", (data) => {
      setClicksLeft(data);
    });
    return () => {
      console.log("leave");
      socket.emit("leaveRoom", roomId);
    };
  }, [data, roomId]);

  return !!data ? (
    <>
      <SpookyNavBar roomId={roomId} id={data.id} clicksLeft={clicksLeft} />
      <Suspense fallback={<Loading />}>
        <div
          className="click-page"
          onClick={() => {
            setAnimationPosition((currPos) => {
              if (currPos === 2) {
                return 0;
              }
              return currPos + 1;
            });
            registerClick(socket, roomId);
          }}
        >
          <div className="click-page-container">
            {/* <Box>
              <Typography component="h6" color="inherit" textAlign="center">
                Clicks remaining: {clicksLeft}
              </Typography>
            </Box>
            <ClickButton socket={socket} roomId={roomId} /> */}
            <HealthBar value={clicksLeft} />
          </div>
          <div className="enemy">
            <img src={Enemy} alt="Enemy" className="enemy-character" />
            <div className="enemy-shadow" />
          </div>
          <BGScene />
        </div>
      </Suspense>
    </>
  ) : (
    <div>No such room exists</div>
  );
};

export default ClickerPage;
