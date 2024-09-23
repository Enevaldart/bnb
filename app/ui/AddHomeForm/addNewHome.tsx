"use client"; // Marking it as a client component
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./addNewHome.module.css";

const AddHomeForm = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]); // To handle multiple image files
  const [amenities, setAmenities] = useState([""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleImageChange = (e) => {
    setImages([...e.target.files]); // Store the selected images as an array
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length < 1) {
      setError("Please provide at least one image.");
      return;
    }

    const formData = new FormData(); // Using FormData to send both text and files

    // Append text fields
    formData.append("name", name);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("amenities", JSON.stringify(amenities)); // Convert amenities to JSON string

    // Append images (single or multiple)
    images.forEach((image) => {
      formData.append("images", image); // Append each file to 'images' field
    });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to add a home.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/homes",
        formData, // Send FormData with files
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );

      if (response.status === 201) {
        setSuccess("Home added successfully!");
        setError("");

        // Redirect or reset form
        setTimeout(() => {
          router.push("/"); // Redirect to home listing
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add home.");
      setSuccess("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="images">Upload Images:</label>
        <input
          type="file"
          id="images"
          multiple // Allows selecting multiple files
          onChange={handleImageChange}
        />
      </div>
      <div>
        <label htmlFor="amenities">Amenities:</label>
        <input
          type="text"
          id="amenities"
          value={amenities[0]}
          onChange={(e) => setAmenities([e.target.value])}
          required
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <button type="submit">Add Home</button>
    </form>
  );
};

export default AddHomeForm;
