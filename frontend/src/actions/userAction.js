import axios from "axios";
axios.defaults.withCredentials = true;
const userRegister = async (userObj) => {
  try {
    const result = await axios.post(
      "http://localhost:4000/user/register",
      userObj,
    );
    return result;
  } catch (error) {
    return error;
  }
};
const userLogin = async (userObj) => {
  try {
    const result = await axios.post(
      "http://localhost:4000/user/login",
      userObj,
    );
    return result;
  } catch (error) {
    return error;
  }
};
const userLogout = async () => {
  try {
    const result = await axios.get("http://localhost:4000/user/logout");
    return result;
  } catch (error) {
    return error;
  }
};
const getAllUsers = async () => {
  try {
    const result = await axios.get("http://localhost:4000/user/allUsers");
    return result;
  } catch (error) {
    return error;
  }
};

export { userRegister, userLogin, userLogout, getAllUsers };
