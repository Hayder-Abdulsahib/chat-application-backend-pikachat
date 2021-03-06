const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const passport = require("passport");

const {
  signup,
  signin,
  fetchProfile,
  profileUpdate,
  profileData,
  profileList,
} = require("../controllers/userController");

router.post("/signup", signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

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

//update
router.put("/userprofile/:profileId", upload.single("image"), profileUpdate);

router.get("/userprofile/:profileId", profileData);

router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  profileList
);

module.exports = router;
