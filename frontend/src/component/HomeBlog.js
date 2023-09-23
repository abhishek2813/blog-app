import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import Loader from "./Loader";
import { getHomeBlogs } from "../actions/blogActions";
import { toast } from "react-toastify";
function HomeBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchHomeBlog = async () => {
      setLoading(true);
      try {
        const result = await getHomeBlogs();
        // console.log(result);
        if (result.data.status === 201) {
          setBlogs(result.data.data);
        } else {
          // Handle error here, e.g., show an error message
          toast.error("Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error("An error occurred while fetching blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchHomeBlog();
  }, []);
  return (
    <div className="container-fluid">
      <h1 className="text-center p-1">Home Blogs</h1>
      {loading && <Loader />}
      <div className="row">
        {blogs.map((user) => (
          <div className="col-lg-4 py-1" key={user._id}>
            <BlogCard props={user} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeBlog;
