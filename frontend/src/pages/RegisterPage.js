import React, { useEffect } from "react";
import RegisterForm from "../component/RegisterForm";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
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
      <RegisterForm />
      <div>Already Have Account <Link className="link" to="/login">Go Login</Link></div>
    </div>
  );
}

export default RegisterPage;

