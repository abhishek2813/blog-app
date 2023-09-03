import React, { useEffect, useState } from "react";
import { getAllUsers } from "../actions/userAction";
import UserCard from "../component/UserCard";
import Header from "./Header";

function UsersList() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const result = await getAllUsers();
    setUsers(result.data.data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
        <Header />
      {users.map((user) => (
        <UserCard props={user} fetchUsers={fetchUsers} />
      ))}
    </div>
  );
}

export default UsersList;
