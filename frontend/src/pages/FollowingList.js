import React, { useEffect, useState } from "react";
import { getFollowingList } from "../actions/followActions";
import Loader from "../component/Loader";
import { toast } from "react-toastify";

function FollowingList() {
  const [followingList, setFollowingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchFollowerList = async () => {
    setLoading(true)
    const result = await getFollowingList();
    if (result.status === 201) {
      setFollowingList(result.data.data);
      // toast.success("Following List Fetched",{
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
  useEffect(() => {
    fetchFollowerList();
  }, []);
  return (
    <div className="table-responsive">
      <h4 className="text-center">List of Following</h4>
      {loading && <Loader />}
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
            <tr key={item.userId}>
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
