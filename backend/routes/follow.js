const express = require("express");
const { isAuth } = require("../middleware/isAuth");
const {
  followUser,
  getFollowingList,
  getFollowerList,
  unFollowUser,
} = require("../controllers/followController");
const router = express.Router();

//Register User
router.post("/followUser", isAuth, followUser);
router.post("/unFollowUser", isAuth, unFollowUser);
router.get("/followingList", isAuth, getFollowingList);
router.get("/followerList", isAuth, getFollowerList);

module.exports = router;
