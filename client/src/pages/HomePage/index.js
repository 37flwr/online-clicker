import { Box, Button, Container, Grid } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import useSwr from "swr";
import Loading from "../../components/Loading";
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
    <section className="home-page">
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button variant="contained" onClick={() => createNewRoom(socket)}>
          Create new clicker room
        </Button>
      </Box>
      <Suspense fallback={<Loading />}>
        <Container fixed>
          <Grid container columnSpacing={2} rowSpacing={2}>
            {rooms?.map((room, idx) => (
              <RoomCard title={room.id} key={idx} />
            ))}
          </Grid>
        </Container>
      </Suspense>
    </section>
  );
};

export default HomePage;
