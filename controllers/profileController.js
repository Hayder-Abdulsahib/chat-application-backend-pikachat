const { Profile } = require("../db/models");

// fetchProfile
exports.fetchProfile = async (profileId, next) => {
  try {
    const foundProfile = await Profile.findByPk(profileId);
    return foundProfile;
  } catch (error) {
    next(error);
  }
};

//Detail
exports.profileData = async (req, res) => res.json(req.profile);

//Update
exports.profileUpdate = async (req, res, next) => {
  try {
    if (req.profile.userId !== req.user.id) {
      //this condition is used to test the token if it belogns to the user that create the account
      throw {
        status: 401,
        message: "you can't update a profile that not yours",
      };
    }
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.profile.update(req.body);
    res.status(201).json(req.profile);
  } catch (error) {
    next(error);
  }
};

//Create
exports.profileAdd = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    // req.body.userId = req.user.id;
    const profileAdd = await Profile.create(req.body);
    res.status(201).json(profileAdd);
  } catch (error) {
    next(error);
  }
};
