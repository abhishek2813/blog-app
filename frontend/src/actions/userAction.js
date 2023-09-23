import axios from "axios";
axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_API_URL;

const userRegister = async (userObj) => {
  try {
    const result = await axios.post(
      `${url}/user/register`,
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
      `${url}/user/login`,
      userObj,
    );
    return result;
  } catch (error) {
    return error;
  }
};
const userLogout = async () => {
  try {
    const result = await axios.get(`${url}/user/logout`);
    return result;
  } catch (error) {
    return error;
  }
};
const getAllUsers = async () => {
  try {
    const result = await axios.get(`${url}/user/allUsers`);
    return result;
  } catch (error) {
    return error;
  }
};

export { userRegister, userLogin, userLogout, getAllUsers };
