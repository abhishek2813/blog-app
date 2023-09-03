import React from "react";
import { userLogout } from "../actions/userAction";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const result = await userLogout();
    if (result.status === 201) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };
  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default LogoutButton;
