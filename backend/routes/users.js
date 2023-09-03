const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
} = require("../controllers/user");
const { isAuth } = require("../middleware/isAuth");
const router = express.Router();

//Register User
router.post("/register", registerUser);
//login User
router.post("/login", loginUser);
//Logout user
router.get("/logout", isAuth, logoutUser);
router.get("/allUsers", isAuth, getAllUsers);

module.exports = router;
