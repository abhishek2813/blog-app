const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require("validator");
const SALT_ROUND = parseInt(process.env.SALT_ROUND);
//Register user
const registerUser = async (req, resp) => {
  const { name, email, username, password } = req.body;
  if (!name || !email || !username || !password) {
    return resp.status(400).send({ error: "All fields are required" });
  }
  if (!validator.isAlpha(name)) {
    return resp
      .status(400)
      .send({ error: "Name must contain only alphabetic characters" });
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

module.exports = { registerUser };
