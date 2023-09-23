import React, { useContext, useState } from "react";
import { userLogin } from "../actions/userAction";
import { useNavigate } from "react-router-dom";
import { Auth } from "../AuthProvider";
import Loader from "./Loader";
import {toast} from 'react-toastify'
function LoginForm() {
  const [loading, setLoading] = useState(false)
  const {setUser} = useContext(Auth)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    loginId: "",
    password: "",
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    // Reset validation errors
    setValidationErrors({
      loginId: "",
      password: "",
      error: "",
    });

    let isValid = true;

    // Basic validation checks
    if (formData.loginId.trim() === "") {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        loginId: "Email or Username is required",
      }));
      isValid = false;
      setLoading(false)
    }

    if (formData.password.trim() === "") {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      isValid = false;
      setLoading(false)
    }

    if (isValid) {
      //call login function
      const result = await userLogin(formData);
      if (result.status === 201) {
        toast.success("Login Success",{
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          })
       const newUser = window.localStorage.setItem("user", JSON.stringify(result.data.data));
       setUser(result.data.data)
       setLoading(false)
        navigate("/");
        // console.warn("user in login",user);
        
      }else{
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          error: result.response.data.error,
        }));
        toast.error("Error",{
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          })
        setLoading(false)
      }
    }
  };

  return (
    <div className="container">
      {loading && <Loader />}
      <div className="row mt-3 pt-3">
        <h3>Login into Blog App</h3>
        {validationErrors.error && (
              <h1 className="text-center text-danger">{validationErrors.error}</h1>
            )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Email address or Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="loginId"
              value={formData.loginId}
              onChange={handleChange}
              placeholder="Enter Email or Username"
            />
            {validationErrors.loginId && (
              <div className="text-danger">{validationErrors.loginId}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your Password"
            />
            {validationErrors.password && (
              <div className="text-danger">{validationErrors.password}</div>
            )}
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
