const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  messageDelete,
  messageDetail,
  messageFetch,
  messageList,
} = require("../controllers/messageController");

router.param("messageId", async (req, res, next, messageId) => {
  const message = await messageFetch(messageId, next);
  if (message) {
    req.message = message;
    next();
  } else {
    const err = new Error("Message Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", messageList);

router.get("/:messageId", messageDetail);

router.delete(
  "/:messageId",
  passport.authenticate("jwt", { session: false }),
  messageDelete
);

// router.post(
//   "/sendmessage",
//   passport.authenticate("jwt", { session: false }),
//   upload.single("image"),
//   sendMessage
// );

module.exports = router;
