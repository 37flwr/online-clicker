const createNewRoom = (socket, id) => {
  socket.emit("create_room", id);
};

const registerClick = (socket, roomId) => {
  socket.emit("registerClick", roomId);
};

export { createNewRoom, registerClick };
