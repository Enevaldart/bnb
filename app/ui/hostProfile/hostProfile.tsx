import React from "react";
import styles from "./hostProfile.module.css";

interface HostProfileProps {
  hostName: string;
  profilePicture: string;
  reviews: number;
  rating: number;
  yearsHosting: number;
  work: string;
  languages: string;
  description: string;
  coHostName: string;
  coHostPicture: string;
  responseRate: string;
  responseTime: string;
}

const HostProfile: React.FC<HostProfileProps> = ({
  hostName,
  profilePicture,
  reviews,
  rating,
  yearsHosting,
  work,
  languages,
  description,
  coHostName,
  coHostPicture,
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
          <h2>{hostName}</h2>
          <div className={styles.superhost}>Superhost</div>
        </div>
        <div className={styles.hostInfo}>
          <ul className={styles.hostStats}>
            <li><span>{reviews}</span><br /> Reviews</li>
            <li><span>{rating} ★</span><br />Rating</li>
            <li><span>{yearsHosting}</span><br />Years hosting</li>
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
            src={coHostPicture}
            alt="Co-host"
            className={styles.coHostImage}
          />
          <p>{coHostName}</p>
        </div>
        <h3>Host details</h3>
        <p>Response rate: {responseRate}</p>
        <p>Responds {responseTime}</p>
      </div>
    </div>
  );
};

export default HostProfile;
