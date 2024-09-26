"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./addNewHome.module.css";
import { IoCloseSharp } from "react-icons/io5";

const AddHomeForm = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleImageChange = (e) => {
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const handleImageRemove = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleAmenitiesChange = (e) => {
    setAmenities(e.target.value.split(",").map((item) => item.trim()));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (images.length < 1) {
      setError("Please provide at least one image.");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("amenities", JSON.stringify(amenities));

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to add a home.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/homes",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );

      if (response.status === 201) {
        setSuccess("Home added successfully!");
        // Reset form fields
        setName("");
        setLocation("");
        setDescription("");
        setPrice("");
        setImages([]);
        setAmenities([]);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add home.");
      setSuccess("");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Add Home Details</h1>
        <div className={styles.section}>
          <div className={styles.leftSection}>
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
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="bedrooms">No of Bedroom:</label>
                <input
                  type="number"
                  id="bedrooms"
                  //   value={location}
                  // onChange={(e) => setLocation(e.target.value)}
                  // required
                />
              </div>
              <div>
                <label htmlFor="Beds">No of Beds:</label>
                <input
                  type="text"
                  id="beds"
                  // value={price}
                  // onChange={(e) => setPrice(e.target.value)}
                  // required
                />
              </div>
            </div>
            <div>
              <label htmlFor="amenities">Amenities (comma-separated):</label>
              <input
                type="text"
                id="amenities"
                value={amenities.join(", ")}
                onChange={handleAmenitiesChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.rightSection}>
            <h2>Upload Images</h2>
            <div className={styles.imageUpload}>
              <input
                type="file"
                id="images"
                multiple
                onChange={handleImageChange}
                accept="image/*"
              />
              <div className={styles.previewContainer}>
                {images.length > 0 &&
                  images.map((image, index) => (
                    <div key={index} className={styles.imagePreview}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index}`}
                      />
                      {/* Image remove button */}
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => handleImageRemove(index)}
                      >
                        <IoCloseSharp size={20} />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div className={styles.submit}>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && <p style={{ color: "green" }}>{success}</p>}
              <button type="submit">Add Home</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddHomeForm;
