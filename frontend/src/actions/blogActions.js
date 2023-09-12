import axios from "axios";
axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_API_URL;
const getMyBlog = async (page) => {
  try {
    const result = await axios.get(`${url}/blog/get-blogs`);
    return result;
  } catch (error) {
    return error;
  }
};
const createBlog = async (data) => {
  try {
    const result = await axios.post(
      `${url}/blog/create-blog`,
      data,
    );
    return result;
  } catch (error) {
    return error;
  }
};
const deleteBlog = async (id) => {
  try {
    const result = await axios.delete(
      `${url}/blog/deleteBlog/${id}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};
const getSingleBlog = async (id) => {
  try {
    const result = await axios.get(`${url}/blog/blog/${id}`);
    return result;
  } catch (error) {
    return error;
  }
};
const getUpdateBlog = async (dataObj) => {
  try {
    const result = await axios.put(
      `${url}/blog/editBlog`,
      dataObj,
    );
    return result;
  } catch (error) {
    return error;
  }
};
//get Home blog of followling
const getHomeBlogs = async () => {
  try {
    const result = await axios.get(`${url}/blog/homeBlogs`);
    return result;
  } catch (error) {
    return error;
  }
};

export {
  getMyBlog,
  createBlog,
  deleteBlog,
  getSingleBlog,
  getUpdateBlog,
  getHomeBlogs,
};
