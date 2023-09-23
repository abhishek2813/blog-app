import React, { useEffect, useState } from "react";
import { getFollowersList } from "../actions/followActions";
import Loader from "../component/Loader";
import { toast } from "react-toastify";

function FollowerList() {
  const [followerList, setFollowerList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchFollowerList = async () => {
    setLoading(true)
    const result = await getFollowersList();
    if (result.status === 201) {
      setFollowerList(result.data.data);
      // toast.success("Followers Fetched",{
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
      <h4 className="text-center">List of Followers</h4>
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
          {followerList.map((item, i) => (
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

export default FollowerList;
