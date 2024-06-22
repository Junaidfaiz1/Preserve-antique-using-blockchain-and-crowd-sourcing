import React, { useState } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import {
  registerUser,
  // You can import other functions from the interaction file if needed
} from "../../utilities/interact.js";

import "../Login/Login.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     // Call the registerUser function with form data
     await registerUser(
       formData.userName,
       formData.email,
       formData.phoneNumber,
       formData.password
     );
     // Handle successful registration, e.g., redirect or show a success message
     console.log("User registered successfully!");

     // Reset form fields to empty after successful registration
     setFormData({
       userName: "",
       email: "",
       phoneNumber: "",
       password: "",
       confirmPassword: "",
     });
   } catch (error) {
     // Handle registration error, e.g., show an error message
     console.error("Error registering user:", error);
   }
 };



  return (
    <div>
      <Navbar />
      <h3 className="text-center mt-4">Sign Up</h3>
      <div className="Login d-flex justify-content-center align-items-center templete w-100 vh-70  bg-white mt-3 mb-3">
        <div className="w-50  p-5 rounded border border-dark">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter Username"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="form-control"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="form-control"
                required
              />
            </div>
            <div className="d-grid ">
              <button type="submit" className="btn btn-secondary">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
