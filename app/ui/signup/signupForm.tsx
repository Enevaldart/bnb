"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation for Next.js 13+
import axios from "axios";
import styles from "./signup.module.css";
import { FiUserPlus } from "react-icons/fi";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirming password
  const [role, setRole] = useState("user"); // Optional role field
  const [companyName, setCompanyName] = useState(""); // New company field
  const [languagesSpoken, setLanguagesSpoken] = useState(""); // New languages field
  const [companyDescription, setCompanyDescription] = useState(""); // New description field
  const [address, setAddress] = useState(""); // New address field
  const [phoneNumber, setPhoneNumber] = useState(""); // New phone number field
  const [idNumber, setIdNumber] = useState(""); // New ID number field
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const router = useRouter(); // Use the hook directly

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match before making the API call
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          username,
          email,
          password,
          role, // Optional role field
          companyName: companyName || "No company registered", // Default value
          languagesSpoken: languagesSpoken
            ? languagesSpoken.split(",").map((lang) => lang.trim())
            : ["English"], // Default to "English"
          companyDescription: companyDescription || "No description provided", // Default value
          address, // New address field
          phoneNumber, // New phone number field
          idNumber, // New ID number field
        }
      );

      if (response.status === 201) {
        setSuccess("User created successfully!");
        setError("");

        // Redirect to login page after successful signup
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
      setSuccess("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>Sign Up <FiUserPlus className={styles.icon} /></h1>
      <div className={styles.container}>
        <div className={styles.userDetails}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Tom"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <div>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                placeholder="07... or 01..."
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="idNumber">ID Number:</label>
              <input
                type="text"
                id="idNumber"
                placeholder="Your ID Number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles.showPass}>
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>

          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              placeholder="Mombasa, Kenya"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.companyDetails}>
          <div>
            <label htmlFor="companyName">Company Name:</label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              placeholder="Example Homes LLC"
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="languagesSpoken">
              Languages Spoken (comma-separated):
            </label>
            <input
              type="text"
              id="languagesSpoken"
              placeholder="English, Kiswahili"
              value={languagesSpoken}
              onChange={(e) => setLanguagesSpoken(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="companyDescription">
              Company Description:
            </label>
            <textarea
              id="companyDescription"
              placeholder="Say something nice about your company or services..."
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
            />
          </div>
          <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <button type="submit">Sign Up</button>
            <a href="/auth/login">Login instead</a>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
