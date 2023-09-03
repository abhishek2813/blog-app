import React, { useEffect, useState } from "react";
import BlogCard from "../component/BlogCard";
import { getMyBlog } from "../actions/blogActions";
import Header from "./Header";
function MyBlogs() {
  const [blogData, setBlogData] = useState([]);
  const [page, setPage] = useState(1);
  const fetchBlog = async (page) => {
    const result = await getMyBlog(page);
    // check if every thing is fine
    if (result.status === 201) {
      setBlogData(result.data.data);
    }
    // console.log(result);
  };
  useEffect(() => {
    fetchBlog(page);
  }, []);
  return (
    <div>
        <Header />
      <h1>My Blog</h1>
      <div className="row">
        {blogData.map((item) => (
          <div className="col-md-6">
            <BlogCard props={item} fetchBlog={fetchBlog} isButton={true} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBlogs;
