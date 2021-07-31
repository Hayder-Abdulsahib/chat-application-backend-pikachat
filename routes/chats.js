const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const passport = require("passport");

const {
  chatFetch,
  chatCreate,
  chatList,
  chatDelete,
} = require("../controllers/chatController");

router.param("chatId", async (req, res, next, chatId) => {
  const chat = await chatFetch(chatId, next);

  if (chat) {
    req.chat = chat;
    next();
  } else {
    const err = new Error("chat Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", chatList);

router.post(
  "/",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  chatCreate
);

router.delete(
  "/:chatId",
  passport.authenticate("jwt", { session: false }),
  chatDelete
);

module.exports = router;
