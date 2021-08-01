const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const passport = require("passport");

const {
  chatFetch,
  chatCreate,
  chatList,
  chatDelete,
  messageCreate,
  chatUsers,
  chatDetail,
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

router.get("/:chatId", chatDetail);

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

router.post(
  "/:chatId/messages",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  messageCreate
);

//we need this
router.post(
  "/:chatId/userchat",
  passport.authenticate("jwt", { session: false }),
  chatUsers
);

module.exports = router;
