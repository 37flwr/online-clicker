import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSwr from "swr";
import BasicButton from "../../../../components/Buttons/BasicButton";
import socket from "../../../../utils/socket";
import "./styles.scss";

const Rooms = () => {
  const [rooms, setRooms] = useState(null);
  const { data } = useSwr("http://localhost:8080/rooms");
  useEffect(() => {
    setRooms(data);

    // socket listeners
    socket.on("room_created", (data) => {
      setRooms(data);
    });
  }, [data]);
  return (
    <div className="home-page_grid">
      {rooms?.map((room, idx) => (
        <Link
          to={`/click?roomId=${room.id.replace(/\s/g, "")}`}
          className="home-page_grid__link"
        >
          <BasicButton key={idx} size="big">
            {room.id}
          </BasicButton>
        </Link>
      ))}
    </div>
  );
};

export default Rooms;
