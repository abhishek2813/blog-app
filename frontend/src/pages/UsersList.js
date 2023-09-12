import React, { useEffect, useState } from "react";
import { getAllUsers } from "../actions/userAction";
import UserCard from "../component/UserCard";
import Loader from "../component/Loader";


function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchUsers = async () => {
    setLoading(true)
    const result = await getAllUsers();
    setUsers(result.data.data);
    setLoading(false)
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <div className="row">
        {loading && <Loader />}
        {users.map((user) => (
          <div className="col-md-3 my-3 mx-3">
            <UserCard props={user} fetchUsers={fetchUsers} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersList;
