const { rooms } = require("../roomsDB");

exports.getRooms = (req, res) => {
  res.send(rooms);
};

exports.getRoomDetails = (req, res) => {
  const roomId = req.query.roomId;
  const remainingClicks = rooms.filter((room) => room.id === roomId);
  res.send({
    id: remainingClicks[0]?.id,
    remainingClicks: remainingClicks[0]?.clicksLeft,
  });
};
