const express = require("express");
const { sendMessage } = require("../controllers/ChatRoom_msgController");
const passport = require("passport");

const router = express.Router();

router.post(
  "/sendmessage",
  passport.authenticate("jwt", { session: false }),
  sendMessage
);

module.exports = router;
