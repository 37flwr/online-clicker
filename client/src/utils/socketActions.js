const createNewRoom = (socket) => {
  socket.emit("create_room");
};

const registerClick = (socket, roomId) => {
  socket.emit("registerClick", roomId);
};

export { createNewRoom, registerClick };
