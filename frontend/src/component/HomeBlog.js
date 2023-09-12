import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import Loader from "./Loader";
import { getHomeBlogs } from "../actions/blogActions";
function HomeBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchHomeBlog = async () => {
      setLoading(true)
      const result = await getHomeBlogs();
      setBlogs(result.data.data);
      setLoading(false)
    };
    fetchHomeBlog();
  }, []);
  return (
    <div className="container-fluid">
      <h1 className="text-center p-1">Home Blogs</h1>
      {loading && <Loader />}
    <div className="row">
      {blogs.map((user) => (
        <div className="col-lg-4 py-1">
          <BlogCard props={user} />
        </div>
      ))}
    </div>
    </div>
  );
}

export default HomeBlog;
