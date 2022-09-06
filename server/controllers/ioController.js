const uuid4 = require("uuid").v4;
const { rooms } = require("../roomsDB");

exports.ioController = function (socket) {
  console.log("User connected: " + socket.id);

  socket.on("joinRoom", (roomId) => {
    const room = rooms.filter((room) => room.id === roomId)[0];
    if (room) {
      socket.join(roomId);
      const activeUsers = this.adapter.rooms.get(roomId)?.size;
      this.to(roomId).emit("updateActiveUsers", activeUsers);
    }
  });

  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);

    const set = this.sockets.get(socket.id).adapter.sids.get(socket.id);
    const values = set.values();
    const valuesArray = [];
    for (let i = 0; i < set.size; i++) {
      valuesArray.push(values.next().value);
    }
    const usersLeft = this.adapter.rooms.get(roomId)?.size;
    this.to(roomId).emit("updateActiveUsers", usersLeft);
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

  socket.on("disconnecting", () => {
    console.log("User disconnected: " + socket.id);

    const set = this.sockets.get(socket.id).adapter.sids.get(socket.id);
    const values = set.values();
    const valuesArray = [];
    for (let i = 0; i < set.size; i++) {
      valuesArray.push(values.next().value);
    }
    const usersLeft = this.sockets
      .get(socket.id)
      .adapter.rooms.get(valuesArray[1])?.size;
    valuesArray.length > 1 &&
      this.to(valuesArray[1]).emit("updateActiveUsers", usersLeft - 1);
  });
};
