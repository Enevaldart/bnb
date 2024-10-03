"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./reviewForm.module.css";
import axios from "axios";
import ReviewCard from "@/app/ui/reviewcard/reviewcard";

interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ReviewPage({ params }: { params: { id: string } }) {
  console.log("Params in ReviewPage:", params);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [reviews, setReviews] = useState([]); // State to hold existing reviews

  const searchParams = useSearchParams();
  const { id } = params;
  const token = searchParams.get("token");

  // Fetch existing reviews when the component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/homes/${id}/reviews`
        );
        setReviews(response.data);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };

    fetchReviews();
  }, [id]);

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
      await axios.post(
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
      // Optionally refetch reviews after submission
      setReviews([...reviews, { rating, comment }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Reviews Section */}
      <div className={styles.reviewsSection}>
        <h2 className={styles.title}>Reviews</h2>
        <div className={styles.reviewlists}>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
          <>
            <ReviewCard
                      key={index}
                      userName={review.user || "Unknown User"}
                      date={new Date(review.date).toLocaleString()}
                      rating={review.rating}
                      comment={review.comment}
                      likes={298} // You can add likes logic later or mock for now
                    />
            </>
          ))
        ) : (
          <p>No reviews yet. Be the first to leave a review!</p>
        )}
         
         </div>
      </div>

      {/* Review Form Section */}
      <div className={styles.formSection}>
        <h2 className={styles.title}>Leave a Review</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="rating" className={styles.label}>Rating</label>
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
            <label htmlFor="comment" className={styles.label}>Comment</label>
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
