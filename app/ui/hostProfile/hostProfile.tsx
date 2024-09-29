import React from "react";
import styles from "./hostProfile.module.css";

interface HostProfileProps {
  companyHostName: string;
  profilePicture: string;
  reviews: number;
  rating: number;
  homesHosting: number;
  work: string;
  languages: string;
  description: string;
  hostName: string;
  hostPicture: string;
  responseRate: string;
  responseTime: string;
}

const HostProfile: React.FC<HostProfileProps> = ({
  companyHostName,
  profilePicture,
  reviews,
  rating,
  homesHosting,
  work,
  languages,
  description,
  hostName,
  hostPicture,
  responseRate,
  responseTime,
}) => {
  return (
    <div className={styles.hostContainer}>
      <div className={styles.hostProfileCard}>
        <div className={styles.hostProfile}>
          <img
            src={profilePicture}
            alt="Host Profile"
            className={styles.hostImage}
          />
          <h2>{companyHostName}</h2>
          <div className={styles.superhost}>Superhost</div>
        </div>
        <div className={styles.hostInfo}>
          <ul className={styles.hostStats}>
            <li><span>{reviews}</span><br /> Reviews</li>
            <li><span>{rating} ★</span><br />Rating</li>
            <li><span>{homesHosting}</span><br />Homes hosting</li>
          </ul>
        </div>
      </div>
      <div className={styles.hostDetails}>
      <p className={styles.description}>The rating is based from the ratings of all homes managed by the same host.</p>
        <p>
          <strong>My work:</strong> {work}
        </p>
        <p>
          <strong>Speaks:</strong> {languages}
        </p>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.additionalInfo}>
        <h3>Co-hosts</h3>
        <div className={styles.coHost}>
          <img
            src={hostPicture}
            alt="Co-host"
            className={styles.coHostImage}
          />
          <p>{hostName}</p>
        </div>
        <h3>Host details</h3>
        <p>Response rate: {responseRate}</p>
        <p>Responds {responseTime}</p>
      </div>
    </div>
  );
};

export default HostProfile;
