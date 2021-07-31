const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const passport = require("passport");

const {
  profileData,
  profileAdd,
  profileUpdate,
  fetchProfile,
} = require("../controllers/profileController");

router.param("profileId", async (req, res, next, profileId) => {
  const foundProfile = await fetchProfile(profileId, next);
  if (foundProfile) {
    req.profile = foundProfile;
    next();
  } else {
    next({
      status: 404,
      message: "Profile not found",
    });
  }
});

//profile detail
router.get("/:profileId", profileData);
// Add
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  profileAdd
);
//update
router.put(
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  profileUpdate
);

module.exports = router;
