import React, { useState } from "react";
import { userRegister } from "../actions/userAction";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting

    // Reset validation errors
    setValidationErrors({
      name: "",
      username: "",
      email: "",
      password: "",
    });

    let isValid = true;

    // Basic validation checks
    if (formData.name.trim() === "") {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name is required",
      }));
      isValid = false;
    }

    if (formData.username.trim() === "") {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username is required",
      }));
      isValid = false;
    }

    if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
      isValid = false;
    }

    if (formData.password.length < 6) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters long",
      }));
      isValid = false;
    }

    if (isValid) {
      console.log(formData);
      const result = await userRegister(formData);
      if (result.status === 201) {
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
        });
        navigate("/login");
      } else {
        console.warn(result.response.Error);
      }
    }
  };

  return (
    <div className="container">
      <div className="row mt-3 pt-3">
        <h3>Register in Blog App</h3>
        <form onSubmit={handleSubmit} method="post">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Your Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {validationErrors.name && (
              <div className="text-danger">{validationErrors.name}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {validationErrors.username && (
              <div className="text-danger">{validationErrors.username}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {validationErrors.email && (
              <div className="text-danger">{validationErrors.email}</div>
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
              placeholder="Enter your Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {validationErrors.password && (
              <div className="text-danger">{validationErrors.password}</div>
            )}
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
