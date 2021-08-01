const express = require("express");

// Database
const db = require("./db/models");

//Routes
const chatRoutes = require("./routes/chats");
let profileRouter = require("./routes/profiles");
const messageRoutes = require("./routes/messages");
const userRoutes = require("./routes/users");

//cors
const cors = require("cors");

const app = express();

app.use(cors());

//passport
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

app.use(express.json());

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// Routes
app.use("/profile", profileRouter);
app.use("/chats", chatRoutes);
app.use("/messages", messageRoutes);
app.use(userRoutes);

app.use("/media", express.static("media"));

// Middleware
app.use((req, res, next) => {
  const err = new Error("Path Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

const run = async () => {
  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
