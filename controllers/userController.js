const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");
const jwt = require("jsonwebtoken");

const { User } = require("../db/models");

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;

    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res, next) => {
  const token = generateToken(req.user);
  res.json({ token });
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    image: user.image,
    bio: user.bio,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

// fetchProfile
exports.fetchProfile = async (profileId, next) => {
  try {
    const foundProfile = await User.findByPk(profileId);
    return foundProfile;
  } catch (error) {
    next(error);
  }
};

//Update
exports.profileUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newProfile = await req.profile.update(req.body);
    res.status(201).json(newProfile);
  } catch (error) {
    next(error);
  }
};
//Detail
exports.profileData = async (req, res) => res.json(req.profile);
