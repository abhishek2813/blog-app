import axios from "axios";
axios.defaults.withCredentials = true;
const getMyBlog = async (page) => {
  try {
    const result = await axios.get("http://localhost:4000/blog/get-blogs");
    return result;
  } catch (error) {
    return error;
  }
};
const createBlog = async (data) => {
  try {
    const result = await axios.post(
      "http://localhost:4000/blog/create-blog",
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
      `http://localhost:4000/blog/deleteBlog/${id}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};
const getSingleBlog = async (id) => {
  try {
    const result = await axios.get(`http://localhost:4000/blog/blog/${id}`);
    return result;
  } catch (error) {
    return error;
  }
};
const getUpdateBlog = async (dataObj) => {
  try {
    const result = await axios.put(
      "http://localhost:4000/blog/editBlog",
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
    const result = await axios.get("http://localhost:4000/blog/homeBlogs");
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
