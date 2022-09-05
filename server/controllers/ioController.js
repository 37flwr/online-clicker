const uuid4 = require("uuid").v4;
const { rooms } = require("../roomsDB");

exports.ioController = function (socket) {
  console.log("user connected" + socket.id);

  socket.on("joinRoom", (roomId) => {
    const room = rooms.filter((room) => room.id === roomId)[0];
    if (room) {
      socket.join(roomId);
    }
  });

  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    const activeUsers = this.adapter.rooms.get(roomId)?.size;
    this.to(roomId).emit("registerUser", activeUsers);
  });

  socket.on("create_room", () => {
    const roomId = uuid4();
    rooms.push({ id: roomId, clicksLeft: 1_000_000 });
    this.emit("room_created", rooms);
  });

  socket.on("getRoomUsers", (roomId) => {
    const activeUsers = this.adapter.rooms.get(roomId)?.size;
    this.to(roomId).emit("registerUser", activeUsers);
  });

  socket.on("registerClick", (roomId) => {
    const room = rooms.filter((room) => room.id === roomId)[0];
    const roomClicks = room.clicksLeft - 1;
    room.clicksLeft = roomClicks;
    this.to(roomId).emit("clickRegistered", room.clicksLeft);
  });
};
