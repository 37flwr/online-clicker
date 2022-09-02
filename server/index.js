// Requires
const express = require("express");
const cors = require("cors");
const uuid4 = require("uuid").v4;

// db
const rooms = [
  {
    id: uuid4(),
    clicksLeft: 1_000_000,
  },
];
const port = 8080;

// App configuration
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Server listener
http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// API calls
app.get("/rooms", (req, res) => {
  res.send(rooms);
});

app.get("/roomDetails", (req, res) => {
  const roomId = req.query.roomId;
  const remainingClicks = rooms.filter((room) => room.id === roomId);
  res.send(remainingClicks[0]);
});

// Socket.IO listener
io.on("connection", (socket) => {
  console.log("user connected" + socket.id);

  socket.on("joinRoom", (roomId) => {
    const room = rooms.filter((room) => room.id === roomId)[0];
    if (room) {
      socket.join(roomId);
    }
  });

  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
  });

  socket.on("create_room", () => {
    const roomId = uuid4();
    rooms.push({ id: roomId, clicksLeft: 1_000_000 });
    io.emit("room_created", rooms);
  });

  socket.on("registerClick", (roomId) => {
    const room = rooms.filter((room) => room.id === roomId)[0];
    const roomClicks = room.clicksLeft - 1;
    room.clicksLeft = roomClicks;
    io.to(roomId).emit("clickRegistered", room.clicksLeft);
  });
});
