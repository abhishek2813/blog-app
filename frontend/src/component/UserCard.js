import React, { useState } from "react";
import { followUser, unFollowUser } from "../actions/followActions";
import {toast} from 'react-toastify'
import Loader from "./Loader";
function UserCard({ props, fetchUsers }) {
  const [loading, setLoading] = useState(false)
  const handleFollow = async () => {
    setLoading(true)
    const res = await followUser(props.userId);
    if (res.status === 201) {
      toast.success(res.data.message,{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        })
      fetchUsers();
      setLoading(false)
    } else {
      toast.error(res.response.data.message,{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        })
        setLoading(false)
    }
  };
  const handleUnFollow = async () => {
    setLoading(true)
    const res = await unFollowUser(props.userId);
    if (res.status === 201) {
      toast.success(res.data.message,{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        })
      fetchUsers();
      setLoading(false)
    } else {
      toast.error(res.response.data.message,{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        })
        setLoading(false)
    }
  };
  return (
    <div>
       {loading && <Loader />}
      <div className="card" key={props.userId}>
        <div className="card-body">
          <h5 className="card-title">{props.username}</h5>
          <p className="card-text">{props.name}</p>
          <p className="card-text">{props.email}</p>
          {props.follow === false ? (
            <button className="btn btn-primary" onClick={handleFollow}>
              Follow
            </button>
          ) : (
            <button className="btn btn-warning" onClick={handleUnFollow}>
              UnFollow
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
