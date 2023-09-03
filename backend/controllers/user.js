const User = require("../models/User");
const bcrypt = require("bcrypt");
const session = require("express-session");
const validator = require("validator");
const Follow = require("../models/Follow");
const SALT_ROUND = parseInt(process.env.SALT_ROUND);
//Register user
const registerUser = async (req, resp) => {
  const { name, email, username, password } = req.body;
  if (!name || !email || !username || !password) {
    return resp.status(400).send({ error: "All fields are required" });
  }
  if (validator.isEmpty(name)) {
    return resp.status(400).send({ error: "Name must contain only String" });
  }
  if (!validator.isEmail(email)) {
    return resp.status(400).send({ error: "Invalid email address" });
  }
  if (!validator.isAlphanumeric(username)) {
    return resp.status(400).send({ error: "Username must be alphanumeric" });
  }
  if (validator.isEmpty(username)) {
    return resp.status(400).send({ error: "Username cannot be empty" });
  }
  if (!validator.isLength(password, { min: 8 })) {
    return resp
      .status(400)
      .send({ error: "Password must be at least 8 characters long" });
  }

  //Chccek User Name or Email Already Exits
  const exitEmail = await User.findOne({ email: email });
  if (exitEmail) {
    return resp.status(400).send({ Error: "Email Already Exits" });
  }
  const lowerCaseUsername = username.toLowerCase();

  const exitUsername = await User.findOne({ username: lowerCaseUsername });
  if (exitUsername) {
    return resp.status(400).send({ Error: "Username Already Taken" });
  }

  const hashPassword = await bcrypt.hash(password, SALT_ROUND);

  const newUser = new User({
    name,
    email,
    username,
    password: hashPassword,
  });

  try {
    const saveUser = await newUser.save();
    resp
      .status(201)
      .send({ status: 201, message: "User Register Successfully" });
  } catch (error) {
    resp
      .status(500)
      .send({ error: "An error occurred while registering the user" });
  }
};

//Login For User
const loginUser = async (req, resp) => {
  const { loginId, password } = req.body;
  //Chceking both are not empty
  if (!loginId || !password) {
    return resp.status(500).send({ Error: "All fields are required" });
  }
  let userData;
  //Checking if email then find in collection and store in userData
  if (validator.isEmail(loginId)) {
    userData = await User.findOne({ email: loginId });
  } else {
    //find by username and store in userData
    userData = await User.findOne({ username: loginId });
  }

  // if User not Found return
  if (!userData) {
    return resp.status(500).send({ Error: "User Not Found" });
  }
  //checking password and user Password matched or not
  const isMatch = await bcrypt.compare(password, userData.password);

  //if not matched return
  if (!isMatch) {
    return resp.status(500).send({ Error: "Wrong Password" });
  }
  // adding fields in session
  req.session.isAuth = true;
  req.session.user = {
    name: userData.name,
    username: userData.username,
    email: userData.email,
    userId: userData._id,
  };
  //  console.log(req.session);
  resp
    .status(201)
    .send({ status: 201, message: "Login success", data: req.session.user });
};

//User Logout
const logoutUser = (req, resp) => {
  req.session.destroy((err) => {
    if (err) {
      return resp
        .status(400)
        .send({ status: 400, message: "logout failed", error: err });
    }
  });
  return resp.status(201).send({ status: 200, message: "logout successfully" });
};
//Get all Users
const getAllUsers = async (req, resp) => {
  //get current user Id
  const userId = req.session.user.userId;
  try {
    const userList = await User.find({ _id: { $ne: userId } });
    const followingList = await Follow.find({ followerUserId: userId });
    // Create an array of userIds the current user is following
    const followingUserIds = followingList.map(
      (follow) => follow.followingUserId,
    );
    // Create an array of user objects with the follow field
    const userListWithFollow = userList.map((user) => ({
      userId: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      follow: followingUserIds.includes(user._id.toString()),
    }));
    return resp
      .status(201)
      .send({
        status: 201,
        message: "User List Fetched",
        data: userListWithFollow,
      });
  } catch (error) {
    return resp
      .status(400)
      .send({ status: 400, message: "Unable to Fetch Users List" });
  }
};
module.exports = { registerUser, loginUser, logoutUser, getAllUsers };
