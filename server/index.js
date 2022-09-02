// Requires
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const roomsRouter = require("./routes/rooms");
const { ioController } = require("./controllers/ioController");
const PORT = process.env.PORT || 8080;

// Basic configuration
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
  },
});

// Routers configuration
app.use(roomsRouter);

// Socket.IO configuration
io.on("connection", ioController);

// Server listener
http.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
