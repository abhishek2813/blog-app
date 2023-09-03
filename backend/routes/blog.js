const express = require("express");
const { isAuth } = require("../middleware/isAuth");
const {
  createBlog,
  getMyBlogs,
  deleteBlog,
  editBlog,
  getSingleBlog,
  getHomeBlog,
} = require("../controllers/blogController");
const router = express.Router();

//Create a Blog
router.post("/create-blog", isAuth, createBlog);
router.get("/get-blogs", isAuth, getMyBlogs);
router.get("/homeBlogs", isAuth, getHomeBlog);
router.get("/blog/:id", isAuth, getSingleBlog);
router.delete("/deleteBlog/:blogId", isAuth, deleteBlog);
router.put("/editBlog", isAuth, editBlog);

module.exports = router;
