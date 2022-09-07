import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import useSWR from "swr";
import ErrorFallback from "../../components/ErrorFallback";
import Loading from "../../components/Loading";
import socket from "../../utils/socket";
import { registerClick } from "../../utils/socketActions";
import BGScene from "./components/BGScene";
import Enemy from "./components/Enemy";
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

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loading />}>
        <SpookyNavBar roomId={roomId} id={data.id} clicksLeft={clicksLeft} />
        <section
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
            <HealthBar value={clicksLeft} />
            <Enemy />
            <BGScene />
          </div>
        </section>
      </Suspense>
    </ErrorBoundary>
  );
};

export default ClickerPage;
