const express = require("express");
const { getRooms, getRoomDetails } = require("../controllers/rooms");

const router = express.Router();

router.get("/rooms", getRooms);
router.get("/roomDetails", getRoomDetails);

module.exports = router;
