import React, { useEffect, useState } from "react";
import BlogCard from "../component/BlogCard";
import { getMyBlog } from "../actions/blogActions";
import Loader from "../component/Loader";
import { toast } from "react-toastify";

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
      // toast.success("My Blog Fetched",{
      //   position: "top-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   })
    }else{
      toast.error(result.response.data.message,{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        })
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
            <div className="col-md-4 my-2" key={item._id}>
              <BlogCard props={item} fetchBlog={fetchBlog} isButton={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;
