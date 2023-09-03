import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { getHomeBlogs } from "../actions/blogActions";
function HomeBlog() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchHomeBlog = async () => {
      const result = await getHomeBlogs();
      setBlogs(result.data.data);
    };
    fetchHomeBlog();
  }, []);
  return (
    <div>
      {blogs.map((user) => (
        <BlogCard props={user} />
      ))}
    </div>
  );
}

export default HomeBlog;
