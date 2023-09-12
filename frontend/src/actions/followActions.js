import axios from "axios";
axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_API_URL;
const followUser = async (userId) => {
  try {
    const followingUserId = { followingUserId: userId };
    const result = await axios.post(
      `${url}/follow/followUser`,
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
      `${url}/follow/followingList`,
    );
    return result;
  } catch (error) {
    return error;
  }
};
const getFollowersList = async () => {
  try {
    const result = await axios.get(`${url}/follow/followerList`);
    return result;
  } catch (error) {
    return error;
  }
};
const unFollowUser = async (userId) => {
  try {
    const followingUserId = { followingUserId: userId };
    const result = await axios.post(
      `${url}/follow/unFollowUser`,
      followingUserId,
    );
    return result;
  } catch (error) {
    return error;
  }
};
export { followUser, getFollowingList, unFollowUser, getFollowersList };
