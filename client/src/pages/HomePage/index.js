import { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSwr from "swr";
import BGImage from "../../assets/backgrounds/bgMain4.jpg";
import BasicButton from "../../components/Buttons/BasicButton";
import Loading from "../../components/Loading";
import socket from "../../utils/socket";
import { createNewRoom } from "../../utils/socketActions";
import NavBar from "./components/NavBar";
import "./styles.scss";

const HomePage = () => {
  const [rooms, setRooms] = useState(null);
  const { data } = useSwr("http://localhost:8080/rooms");

  useEffect(() => {
    socket.emit("leaveRooms");
    setRooms(data);

    // socket listeners
    socket.on("room_created", (data) => {
      setRooms(data);
    });
  }, [data]);

  return (
    <section className="home-page">
      <NavBar />
      <BasicButton
        onClick={() => createNewRoom(socket)}
        customClassName="home-page__btn"
      >
        Create new clicker room
      </BasicButton>
      <Suspense fallback={<Loading />}>
        <div className="lift">
          {rooms?.map((room, idx) => (
            // <RoomCard title={room.id} key={idx} />
            <BasicButton key={idx} size="big">
              <Link
                to={`/click?roomId=${room.id.replace(/\s/g, "")}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                {room.id}
              </Link>
            </BasicButton>
          ))}
        </div>
      </Suspense>
      <div className="imasd">
        <div className="imasd_1" />
        <img className="imasd_2" src={BGImage} alt="1" />
      </div>
    </section>
  );
};

export default HomePage;
