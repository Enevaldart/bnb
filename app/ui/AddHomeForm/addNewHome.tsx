"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./addNewHome.module.css";
import { IoCloseSharp } from "react-icons/io5";

const AddHomeForm = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setbedrooms] = useState("");
  const [beds, setbeds] = useState("");
  const [images, setImages] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [maxGuests, setMaxGuests] = useState("");
  const [isGuestNumberFixed, setIsGuestNumberFixed] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const fileInputRef = useRef(null);

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
    formData.append("bedrooms", bedrooms);
    formData.append("beds", beds);
    formData.append("price", price);
    formData.append("maxGuests", maxGuests);
    formData.append("isGuestNumberFixed", isGuestNumberFixed);
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
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setSuccess("Home added successfully!");
        setName("");
        setLocation("");
        setDescription("");
        setPrice("");
        setbedrooms("");
        setbeds("");
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

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setImages((prevImages) => [...prevImages, ...droppedFiles]);
  };

  const handleImageBoxClick = () => {
    fileInputRef.current.click();
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
                placeholder="Shanzu flats"
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
                  placeholder="Shanzu"
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
                  placeholder="ksh..."
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
                  placeholder="2"
                  value={bedrooms}
                  onChange={(e) => setbedrooms(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="Beds">No of Beds:</label>
                <input
                  type="text"
                  id="beds"
                  placeholder="1 master and 2 other beds"
                  value={beds}
                  onChange={(e) => setbeds(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <div>
                <label>Maximum Guests</label>
                <input
                  type="number"
                  placeholder="Max Guests"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>
                  Is Guest Number Fixed?
                  <input
                    type="checkbox"
                    checked={isGuestNumberFixed}
                    onChange={(e) => setIsGuestNumberFixed(e.target.checked)}
                  />
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="amenities">Amenities (comma-separated):</label>
              <input
                type="text"
                id="amenities"
                placeholder="BeachFront, Ample Parking, ..."
                value={amenities.join(", ")}
                onChange={handleAmenitiesChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                placeholder="Say something nice about the home..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.rightSection}>
            <h2>Upload Images</h2>
          <div
            className={styles.imageUpload}
            onClick={handleImageBoxClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="images"
              multiple
              onChange={handleImageChange}
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <p>Drag and drop images here, or click to upload</p>
            <div className={styles.previewContainer}>
              {images.length > 0 &&
                images.map((image, index) => (
                  <div key={index} className={styles.imagePreview}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                    />
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
