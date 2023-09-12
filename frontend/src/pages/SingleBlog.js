import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleBlog } from "../actions/blogActions";
import Loader from "../component/Loader";

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
      }
      setLoading(false)
    };
    fetchSingleBlog();
  }, []);
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
