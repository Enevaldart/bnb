import styles from "./overalRating.module.css";
import {FaChevronDown} from 'react-icons/fa'

interface OverallRatingProps {
  rating: number;
  totalReviews: number;
}

const OverallRating: React.FC<OverallRatingProps> = ({
  rating,
  totalReviews,
}) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={styles.container}>
      <p className={styles.rating}>{rating.toFixed(2)}</p>
      <div>
        <div className={styles.stars}>
          {Array.from({ length: fullStars }).map((_, i) => (
            <span key={i} className={styles.star}>
              ★
            </span>
          ))}
          {halfStar && <span className={styles.star}>★</span>}
          {Array.from({ length: emptyStars }).map((_, i) => (
            <span key={i} className={styles.emptyStar}>
              ★
            </span>
          ))}
        </div>
        <p className={styles.reviewCount}>({totalReviews} Reviews)</p>
      </div>
      <FaChevronDown className="chevron-down" />
    </div>
  );
};

export default OverallRating;
