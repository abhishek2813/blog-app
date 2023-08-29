const express = require("express");
const {isAuth} = require("../middleware/isAuth");
const { createBlog } = require("../controllers/blogController");
const { getMyBlogs } = require("../controllers/blogController");
const { deleteBlog } = require("../controllers/blogController");
const { editBlog } = require("../controllers/blogController");
const router = express.Router();

//Create a Blog
router.post("/create-blog",isAuth,createBlog)
router.get("/get-blogs",isAuth,getMyBlogs)
router.delete("/deleteBlog/:blogId",isAuth,deleteBlog)
router.put("/editBlog",isAuth,editBlog)

module.exports=router;