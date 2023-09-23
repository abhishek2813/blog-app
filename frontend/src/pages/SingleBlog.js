import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleBlog } from "../actions/blogActions";
import Loader from "../component/Loader";
import { toast } from "react-toastify";

function SingleBlog() {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const fetchSingleBlog = async () => {
      setLoading(true)
      const result = await getSingleBlog(id);
      if (result.status === 201) {
        setBlog(result.data.data);
        // toast.success("Single Blog Fetched",{
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
    };
    fetchSingleBlog();
  }, [id]);
  return (
    <div>
    <div className="container">
      {loading && <Loader />}
      <div className="row">
        <div class="card m-3 p-3">
          <div class="card-body">
            <h5 class="card-title">{blog.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Creation Time {blog.creationDateTime}</h6>
            <p class="card-text">
            {blog.textBody}
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
}

export default SingleBlog;
