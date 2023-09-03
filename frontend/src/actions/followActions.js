import axios from "axios";
axios.defaults.withCredentials = true;
const followUser = async (userId) => {
  try {
    const followingUserId = { followingUserId: userId };
    const result = await axios.post(
      "http://localhost:4000/follow/followUser",
      followingUserId,
    );
    return result;
  } catch (error) {
    return error;
  }
};
const getFollowingList = async () => {
  try {
    const result = await axios.get(
      "http://localhost:4000/follow/followingList",
    );
    return result;
  } catch (error) {
    return error;
  }
};
const getFollowersList = async () => {
  try {
    const result = await axios.get("http://localhost:4000/follow/followerList");
    return result;
  } catch (error) {
    return error;
  }
};
const unFollowUser = async (userId) => {
  try {
    const followingUserId = { followingUserId: userId };
    const result = await axios.post(
      "http://localhost:4000/follow/unFollowUser",
      followingUserId,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export { followUser, getFollowingList, unFollowUser, getFollowersList };
