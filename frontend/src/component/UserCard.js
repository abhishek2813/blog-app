import React from "react";
import { followUser, unFollowUser } from "../actions/followActions";
function UserCard({ props, fetchUsers }) {
  const handleFollow = async () => {
    const res = await followUser(props.userId);
    if (res.status === 201) {
      alert(res.data.message);
      fetchUsers();
    } else {
      alert(res.response.data.message);
    }
  };
  const handleUnFollow = async () => {
    const res = await unFollowUser(props.userId);
    if (res.status === 201) {
      alert(res.data.message);
      fetchUsers();
    } else {
      alert(res.response.data.message);
    }
  };
  return (
    <div>
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
