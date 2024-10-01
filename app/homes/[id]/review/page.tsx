"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./reviewForm.module.css";
import axios from "axios";

export default function ReviewPage({ params }: { params: { id: string } }) {
  console.log("Params in ReviewPage:", params);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const searchParams = useSearchParams();
  const { id } = params;

  // Check if homeId is being used properly
  if (!id) {
    console.error(
      "homeId is undefined. Make sure your dynamic route is set up correctly."
    );
  }
  const token = searchParams.get("token");

  console.log("Home ID:", id); // Log homeId to verify
  console.log("Token:", token); // Log token to verify

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    // Validate token and homeId
    if (!token || !id) {
      setError("Invalid token or home ID.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/homes/${id}/review`,
        { rating, comment, token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Thank you for your review!");
      setComment("");
      setRating(5);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Leave a Review</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="rating" className={styles.label}>
              Rating
            </label>
            <input
              type="number"
              id="rating"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="comment" className={styles.label}>
              Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className={styles.textarea}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.button}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
