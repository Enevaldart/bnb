"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation for Next.js 13+
import axios from "axios";
import styles from "./signup.module.css";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirming password
  const [role, setRole] = useState("user"); // Optional role field
  const [companyName, setCompanyName] = useState(""); // New company field
  const [languagesSpoken, setLanguagesSpoken] = useState(""); // New languages field
  const [companyDescription, setCompanyDescription] = useState(""); // New description field
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
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        email,
        password,
        role, // Optional role field
        companyName: companyName || "No company registered", // Default value
        languagesSpoken: languagesSpoken
          ? languagesSpoken.split(",").map((lang) => lang.trim())
          : ["English"], // Default to "English"
        companyDescription: companyDescription || "No description provided", // Default value
      });

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
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type={showPassword ? "text" : "password"} // Toggle password visibility
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
     
      <div>
        <label htmlFor="companyName">Company Name (optional):</label>
        <input
          type="text"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="languagesSpoken">Languages Spoken (comma-separated):</label>
        <input
          type="text"
          id="languagesSpoken"
          value={languagesSpoken}
          onChange={(e) => setLanguagesSpoken(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="companyDescription">Company Description (optional):</label>
        <textarea
          id="companyDescription"
          value={companyDescription}
          onChange={(e) => setCompanyDescription(e.target.value)}
        />
      </div>
      <div>
        <input
          type="checkbox"
          id="showPassword"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        <label htmlFor="showPassword">Show Password</label>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <button type="submit">Sign Up</button>
      <a href="/auth/login">Login instead</a>
    </form>
  );
};

export default SignupForm;
