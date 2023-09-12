import React, { useContext, useEffect } from "react";
import LoginForm from "../component/LoginForm";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../AuthProvider";

function LoginPage() {
  const {user} = useContext(Auth)
  const navigate = useNavigate();
  useEffect(() => {
  //   //check if user Already login
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <LoginForm />
      <div className="text-center">Create Account <Link className="link" to="/register">Go Register</Link></div>
    </div>
  );
}

export default LoginPage;
