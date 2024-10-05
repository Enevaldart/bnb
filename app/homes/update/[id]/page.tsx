"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./update.module.css";
import { IoCloseSharp } from "react-icons/io5";

interface Home {
  _id: string;
  name: string;
  location: string;
  description: string;
  price: string;
  bedrooms: string;
  beds: string;
  amenities: string[];
  imageUrl: string[];
  maxGuests: string;
}

const UpdateHomePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();

  const [homeData, setHomeData] = useState<Home>({
    _id: "",
    name: "",
    location: "",
    description: "",
    price: "",
    bedrooms: "",
    beds: "",
    amenities: [],
    imageUrl: [],
    maxGuests: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [deleteImages, setDeleteImages] = useState<string[]>([]); // Tracks images to be deleted
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFlexibleGuests, setIsFlexibleGuests] = useState(false);

  const baseURL = "http://localhost:5000";

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/homes/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setHomeData(response.data);
        } else {
          setError("Failed to fetch home data");
        }
      } catch (err) {
        setError("Error fetching home data");
        console.error(err);
      }
    };

    fetchHome();
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "amenities") {
      setHomeData({
        ...homeData,
        [name]: value.split(",").map((item) => item.trim()),
      });
    } else {
      setHomeData({ ...homeData, [name]: value });
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleImageRemove = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleExistingImageRemove = (imageUrl: string) => {
    setDeleteImages([...deleteImages, imageUrl]);
    setHomeData({
      ...homeData,
      imageUrl: homeData.imageUrl.filter((url) => url !== imageUrl),
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized");
        return;
      }

      const formData = new FormData();
      formData.append("name", homeData.name);
      formData.append("location", homeData.location);
      formData.append("description", homeData.description);
      formData.append("price", homeData.price);
      formData.append("bedrooms", homeData.bedrooms);
      formData.append("beds", homeData.beds);
      formData.append("amenities", JSON.stringify(homeData.amenities));

      formData.append("maxGuests", homeData.maxGuests); // Include maxGuests value
      formData.append("isFlexibleGuests", JSON.stringify(isFlexibleGuests));

      if (images.length > 0) {
        images.forEach((image) => {
          formData.append("images", image);
        });
      }

      formData.append("deleteImages", JSON.stringify(deleteImages));

      const response = await axios.put(
        `http://localhost:5000/api/homes/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Home updated successfully!");
        setTimeout(() => {
          router.push(`/homes/${id}`);
        }, 2000);
      } else {
        setError("Failed to update home");
      }
      setIsLoading(false);
    } catch (err) {
      setError("Error updating home");
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Update Home</h1>
        <div className={styles.section}>
          <div className={styles.leftSection}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={homeData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <div>
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={homeData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={homeData.price}
                  onChange={handleChange}
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
                  value={homeData.bedrooms}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="Beds">No of Beds:</label>
                <input
                  type="text"
                  id="beds"
                  value={homeData.beds}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="maxGuests">Maximum Guests:</label>
                <input
                  type="number"
                  id="maxGuests"
                  name="maxGuests"
                  value={homeData.maxGuests}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={isFlexibleGuests}
                    onChange={(e) => setIsFlexibleGuests(e.target.checked)}
                  />
                  Flexible Guests
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="amenities">Amenities (comma-separated):</label>
              <input
                type="text"
                id="amenities"
                name="amenities"
                value={homeData.amenities.join(", ")}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={homeData.description}
                onChange={handleChange}
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
                      <button
                        type="button"
                        onClick={() => handleImageRemove(index)}
                      >
                        <IoCloseSharp />
                      </button>
                    </div>
                  ))}
              </div>

              {/* Display Existing Images */}
              <div className={styles.existingImages}>
                {homeData.imageUrl.length > 0 &&
                  homeData.imageUrl.map((image, index) => (
                    <div key={index} className={styles.imagePreview}>
                      <img
                        src={`${baseURL}${image}`}
                        alt={`Existing ${index}`}
                      />
                      <button
                        type="button"
                        onClick={() => handleExistingImageRemove(image)}
                      >
                        <IoCloseSharp />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div className={styles.submit}>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && <p style={{ color: "green" }}>{success}</p>}
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Home"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateHomePage;
