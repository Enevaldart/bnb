"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./update.module.css";

interface Home {
  _id: string;
  name: string;
  location: string;
  description: string;
  price: string;
  amenities: string[];
  imageUrl: string[];
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
    amenities: [],
    imageUrl: [],
  });

  const [images, setImages] = useState<FileList | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      setImages(e.target.files);
    }
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
      formData.append("amenities", JSON.stringify(homeData.amenities));

      if (images) {
        Array.from(images).forEach((image) => {
          formData.append("images", image);
        });
      }

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
        // Update local state with the response data
        setHomeData(response.data);

        // Refresh the page to ensure all components re-render with new data
        router.refresh();

        // Navigate to the home page
        router.push(`/homes/${id}`);
      } else {
        setError("Failed to update home");
      }
    } catch (err) {
      setError("Error updating home");
      console.error(err);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Update Home</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={homeData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={homeData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={homeData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={homeData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Amenities (comma-separated)</label>
          <input
            type="text"
            name="amenities"
            value={homeData.amenities.join(", ")}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Images</label>
          <input
            type="file"
            name="images"
            onChange={handleImageChange}
            multiple
          />
        </div>
        <button type="submit">Update Home</button>
      </form>
    </div>
  );
};

export default UpdateHomePage;
