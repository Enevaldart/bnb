// components/ReviewCard.tsx
import React from "react";
import styles from "./reviewcard.module.css";

interface ReviewCardProps {
  userName: string;
  date: string;
  rating: number;
  comment: string;
  likes: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  userName,
  date,
  rating,
  comment,
  likes,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.profile}>
          <div className={styles.avatar}></div>
          <div>
            <h4 className={styles.userName}>{userName}</h4>
            <p className={styles.date}>{date}</p>
          </div>
        </div>
        <div className={styles.rating}>
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className={
                index < rating ? styles.activeStar : styles.inactiveStar
              }
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div className={styles.comment}>{comment}</div>
      <div className={styles.footer}>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
