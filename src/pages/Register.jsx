// src/pages/Register.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import "../css/Login.css"; // Using the same CSS as Login for consistency

const Register = () => {
  const { updateCurrentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email.";
    if (formData.username.length < 4) newErrors.username = "Username must be at least 4 characters.";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      const user = { name: formData.username };
      updateCurrentUser(user);
      navigate("/music-preferences"); // Redirect to the music preferences page
    }
  };

  return (
    <div className="login-page"> 
      <div className="login-container">
        <h1 className="login-heading">Music Reco</h1>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
        />
        {errors.fullName && <p className="error-message">{errors.fullName}</p>}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        {errors.username && <p className="error-message">{errors.username}</p>}

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <p className="error-message">{errors.password}</p>}

        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default Register;