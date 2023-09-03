import React, { useEffect } from "react";
import LoginForm from "../component/LoginForm";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    //check if user Already login
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
