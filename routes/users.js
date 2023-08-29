const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/user");
const {isAuth} = require("../middleware/isAuth");
const router = express.Router();

//Register User
router.post("/register",registerUser)
//login User
router.post("/login",loginUser)
//Logout user
router.get("/logout",isAuth,logoutUser)

module.exports=router;