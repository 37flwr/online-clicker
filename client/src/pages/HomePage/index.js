import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import BasicButton from "../../components/Buttons/BasicButton";
import Loading from "../../components/Loading";
import socket from "../../utils/socket";
import { createNewRoom } from "../../utils/socketActions";
import Background from "./components/Background";
import NavBar from "./components/NavBar";
import Rooms from "./components/Rooms";
import "./styles.scss";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    socket.emit("leaveRooms");
  });

  return (
    <section className="home-page">
      <NavBar />
      <div className="home-page_container">
        <BasicButton
          onClick={() => {
            const id = uuidv4();
            createNewRoom(socket, id);
            navigate(`/click?roomId=${id}`);
          }}
          customClassName="home-page_container__btn"
        >
          Create new clicker room
        </BasicButton>
        <Suspense fallback={<Loading />}>
          <Rooms />
        </Suspense>
      </div>
      <Background />
    </section>
  );
};

export default HomePage;
