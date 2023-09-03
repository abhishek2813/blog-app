import React, { useEffect } from "react";
import RegisterForm from "../component/RegisterForm";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

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
        <Header />
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
