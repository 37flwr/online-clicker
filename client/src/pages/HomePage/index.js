import { useEffect, useState } from "react";
import useSwr from "swr";
import RoomCard from "../../components/RoomCard";
import socket from "../../utils/socket";
import { createNewRoom } from "../../utils/socketActions";
import "./styles.scss";

const HomePage = () => {
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
    <div>
      <button onClick={() => createNewRoom(socket)}>
        Create new clicker room
      </button>
      <div>
        {rooms ? (
          rooms.map((room, idx) => {
            return <RoomCard title={room.name} key={idx} />;
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
