import React from "react";
import { deleteBlog } from "../actions/blogActions";
import { Link } from "react-router-dom";
// import { Link } from 'react-router-dom';

function BlogCard({ props, fetchBlog, isButton }) {
  //handle delete
  const handleDelete = async () => {
    const result = await deleteBlog(props._id);
    if (result.data.status === 201) {
      alert(result.data.message);
      fetchBlog();
    } else {
      alert(result.data.message);
    }
  };
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.textBody}</p>
        {isButton ? (
          <>
            <Link className="btn btn-primary" to={`/edit-blog/${props._id}`}>
              Edit
            </Link>
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
