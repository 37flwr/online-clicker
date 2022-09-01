// db
const rooms = [
  {
    name: "Test room",
    clicksLeft: 1_000_000,
  },
];
const port = 8080;

// Requires
const express = require("express");
const cors = require("cors");
const uuid4 = require("uuid").v4;

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

app.get("/rooms", (req, res) => {
  res.send(rooms);
});

app.get("/roomClicks", (req, res) => {
  console.log(req.query.roomId);
  const roomId = req.query.roomId;
  const remainingClicks = rooms.filter((room) => room.name === roomId);
  console.log(remainingClicks[0].clicksLeft);
  res.send(`${remainingClicks[0].clicksLeft}`);
});

io.on("connection", (socket) => {
  console.log("user connected" + socket.id);

  //   socket.on("send_msg", (data) => {
  //     socket.broadcast.emit("receive_msg", data);
  //   });

  socket.on("create_room", () => {
    const roomId = uuid4();
    console.log(roomId);
    rooms.push({ name: roomId, clicksLeft: 1_000_000 });
    io.emit("room_created", rooms);
  });
});
