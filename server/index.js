const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 8080;

app.use(express.static("client"));

io.on("connection", (socket) => {
  console.log("user connected" + socket.id);

  //   socket.on("send_msg", (data) => {
  //     socket.broadcast.emit("receive_msg", data);
  //   });
});

http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
