const validator = require("validator");
const mongoose = require("mongoose");
const Follow = require("../models/Follow");
const { verifyUserId } = require("../utils/verifyUserId");
const User = require("../models/User");
//follow User
const followUser = async (req, res) => {
  //getting follow user id
  const { followingUserId } = req.body;
  //follower user id;
  const followerUserId = req.session.user.userId;
  if (!followingUserId) {
    return res.status(400).json({ status: 400, message: "Invalid user Id" });
  }
  // validate Following User Id
  try {
    const userFollow = await verifyUserId(followingUserId);
    if (userFollow === "err") {
      return res.status(400).json({ status: 400, message: "Db Error" });
    }
    if (userFollow === false) {
      return res
        .status(400)
        .json({ status: 400, message: "Following User Id not Found" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ status: 400, message: "Unable to find user id" });
  }
  //Validtion on follower User id
  // validate Following User Id
  try {
    const userFollow = await verifyUserId(followerUserId);
    if (userFollow === "err") {
      return res.status(400).json({ status: 400, message: "Db Error" });
    }
    if (userFollow === false) {
      return res
        .status(400)
        .json({ status: 400, message: "Follower User Id not Found" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ status: 400, message: "Unable to find Follower userId" });
  }

  //check user Already follow
  try {
    const followDetails = await Follow.findOne({
      followingUserId,
      followerUserId,
    });
    if (followDetails) {
      return res
        .status(400)
        .json({ status: 400, message: "User Already following" });
    }
    // save into follow collection
    const newFollower = new Follow({
      followingUserId,
      followerUserId,
    });
    await newFollower.save();
    return res
      .status(201)
      .json({ status: 201, message: "User Follow successfully" });
  } catch (error) {
    return res.status(400).json({ status: 400, message: "Db error" });
  }
};

//get Following List
const getFollowingList = async (req, resp) => {
  const userId = req.session.user.userId;
  const page = req.query.page || 1;
  const LIMIT = 10;
  if (!userId) {
    return resp
      .status(400)
      .send({ status: 400, message: "Invalid session id" });
  }
  //follow validation
  // validate Following User Id
  try {
    const userFollow = await verifyUserId(userId);
    if (userFollow === "err") {
      return resp
        .status(400)
        .json({ status: 400, message: "Db Error : Following List Endpoint" });
    }
    if (userFollow === false) {
      return resp.status(400).json({ status: 400, message: "User not Found" });
    }
  } catch (error) {
    return resp
      .status(400)
      .json({ status: 400, message: "Unable to find Following List" });
  }
  try {
    const followingList = await Follow.find({ followerUserId: userId })
      .sort({ creationDateTime: -1 })
      .skip(parseInt(page) - 1)
      .limit(LIMIT);

    //store following user id into array
    let followingListUserId = [];
    followingList.forEach((followObj) =>
      followingListUserId.push(followObj.followingUserId),
    );

    const userIdList = await User.find({ _id: { $in: followingListUserId } });
    // Create an array of user objects with the follow field
    const userListWithFollow = userIdList.map((user) => ({
      userId: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    }));
    //return userIdList
    return resp.status(201).send({
      status: 201,
      message: "Fetched following list",
      data: userListWithFollow,
    });
  } catch (error) {
    return resp
      .status(400)
      .json({ status: 400, message: "DB Error: Following List" });
  }
};
//get Following List
const getFollowerList = async (req, resp) => {
  const userId = req.session.user.userId;
  const page = req.query.page || 1;
  const LIMIT = 10;
  if (!userId) {
    return resp
      .status(400)
      .send({ status: 400, message: "Invalid session id" });
  }
  //follow validation
  // validate follower User Id
  try {
    const userFollow = await verifyUserId(userId);
    if (userFollow === "err") {
      return resp
        .status(400)
        .json({ status: 400, message: "Db Error : follower List Endpoint" });
    }
    if (userFollow === false) {
      return resp.status(400).json({ status: 400, message: "User not Found" });
    }
  } catch (error) {
    return resp
      .status(400)
      .json({ status: 400, message: "Unable to find follower List" });
  }
  try {
    const followerList = await Follow.find({ followingUserId: userId })
      .sort({ creationDateTime: -1 })
      .skip(parseInt(page) - 1)
      .limit(LIMIT);

    //store follower user id into array
    let followerListUserId = [];
    followerList.forEach((followObj) =>
      followerListUserId.push(followObj.followerUserId),
    );

    const userIdList = await User.find({ _id: { $in: followerListUserId } });
    //return userIdList
    const userListWithFollow = userIdList.map((user) => ({
      userId: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    }));
    return resp.status(201).send({
      status: 201,
      message: "Fetched follower list",
      data: userListWithFollow,
    });
  } catch (error) {
    return resp
      .status(400)
      .json({ status: 400, message: "DB Error: follower List" });
  }
};

//unfollow user
const unFollowUser = async (req, res) => {
  //getting follow user id
  const { followingUserId } = req.body;
  //follower user id;
  const followerUserId = req.session.user.userId;
  if (!followingUserId) {
    return res.status(400).json({ status: 400, message: "Invalid user Id" });
  }
  // validate Following User Id
  try {
    const userFollow = await verifyUserId(followingUserId);
    if (userFollow === "err") {
      return res.status(400).json({ status: 400, message: "Db Error" });
    }
    if (userFollow === false) {
      return res
        .status(400)
        .json({ status: 400, message: "Following User Id not Found" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ status: 400, message: "Unable to find user id" });
  }
  //Validtion on follower User id
  // validate Following User Id
  try {
    const userFollow = await verifyUserId(followerUserId);
    if (userFollow === "err") {
      return res.status(400).json({ status: 400, message: "Db Error" });
    }
    if (userFollow === false) {
      return res
        .status(400)
        .json({ status: 400, message: "Follower User Id not Found" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ status: 400, message: "Unable to find Follower userId" });
  }

  //check user Already follow
  try {
    const followDetails = await Follow.findOneAndDelete({
      followingUserId,
      followerUserId,
    });

    return res
      .status(201)
      .json({ status: 201, message: "UnFollow successfully" });
  } catch (error) {
    return res.status(400).json({ status: 400, message: "Db error" });
  }
};

module.exports = {
  followUser,
  getFollowingList,
  getFollowerList,
  unFollowUser,
};
