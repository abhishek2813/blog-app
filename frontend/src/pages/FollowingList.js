import React, { useEffect, useState } from "react";
import { getFollowingList } from "../actions/followActions";
import Header from "./Header";

function FollowingList() {
  const [followingList, setFollowingList] = useState([]);
  const fetchFollowerList = async () => {
    const result = await getFollowingList();
    if (result.status === 201) {
      setFollowingList(result.data.data);
    }
  };
  useEffect(() => {
    fetchFollowerList();
  }, []);
  return (
    <div className="table-responsive">
        <Header />
      <h4 className="text-center">List of Following</h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {followingList.map((item, i) => (
            <tr>
              <th scope="row">{i + 1}</th>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>
                <button className="btn btn-primary">Blog</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FollowingList;
