import axios from "axios";
import React, { useEffect, useState } from "react";
import RoomCard from "../../components/RoomCard";
import socket from "../../socket";

const createNewRoom = () => {
  socket.emit("create_room");
};

const HomePage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // fetch data from server
    axios.get("http://localhost:8080/rooms").then((res) => {
      setRooms(res.data);
    });

    // socket listeners
    socket.on("room_created", (data) => {
      setRooms(data);
    });
  }, []);

  return (
    <div>
      <button onClick={createNewRoom}>Create new clicker room</button>
      <div>
        {rooms.length > 0 &&
          rooms.map((room, idx) => {
            return <RoomCard title={room.name} key={idx} />;
          })}
      </div>
    </div>
  );
};

export default HomePage;
