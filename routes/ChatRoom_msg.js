const express = require("express");
const { sendMessage } = require("../controllers/ChatRoom_msgController");

const router = express.Router();

router.post("/sendmessage", sendMessage);

module.exports = router;
