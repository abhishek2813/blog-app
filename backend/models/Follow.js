const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FollowSchema = new Schema({
  followerUserId: {
    type: String,
    ref: "users",
    require: true,
  },
  followingUserId: {
    type: String,
    ref: "users",
    require: true,
  },
  creationDateTime: {
    type: Date,
    default: Date.now(),
    require: true,
  },
});
module.exports = mongoose.model("follow", FollowSchema);
