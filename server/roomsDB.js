const uuid4 = require("uuid").v4;

exports.rooms = [
  {
    id: uuid4(),
    clicksLeft: 1_000_000,
  },
];
