import React, { useEffect, useState } from "react";
import BlogCard from "../component/BlogCard";
import { getMyBlog } from "../actions/blogActions";
import Loader from "../component/Loader";

function MyBlogs() {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const fetchBlog = async (page) => {
    setLoading(true)
    const result = await getMyBlog(page);
    // check if every thing is fine
    if (result.status === 201) {
      setBlogData(result.data.data);
    }
    setLoading(false)
    // console.log(result);
  };
  useEffect(() => {
    fetchBlog(page);
  }, []);
  return (
    <div>
      <div className="container-fluid">
        <h1 className="text-center p-3">My Blog</h1>
        {loading && <Loader />}
        <div className="row">
          {blogData.map((item) => (
            <div className="col-md-4 my-2">
              <BlogCard props={item} fetchBlog={fetchBlog} isButton={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;
