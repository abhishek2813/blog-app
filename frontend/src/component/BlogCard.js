import React, { useState } from "react";
import { deleteBlog } from "../actions/blogActions";
import { Link } from "react-router-dom";
import Loader from "./Loader";

function BlogCard({ props, fetchBlog, isButton }) {
  const [loading, setLoading] = useState(false);
  //handle delete
  const handleDelete = async () => {
    setLoading(true)
    const result = await deleteBlog(props._id);
    if (result.data.status === 201) {
      alert(result.data.message);
      fetchBlog();
    } else {
      alert(result.data.message);
    }
    setLoading(false)
  };
  return (
    <div className="card" key={props._id}>
      <div className="card-body">
        <h5 className="card-title">{props.title.substring(0,50)+"...."}</h5>
        <p className="card-text">{props.textBody.substring(0,100)+"...."}</p>
        <p className="card-subtitle mb-2 text-muted">Creation Time {props.creationDateTime}</p>
        <Link className="btn btn-warning" to={`/blog/${props._id}`}>Read More</Link>
        {isButton ? (
          <>
            <Link className="btn btn-primary mx-2" to={`/edit-blog/${props._id}`}>
              Edit
            </Link>
            {loading && <Loader />}
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default BlogCard;
