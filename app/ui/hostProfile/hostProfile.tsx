import React, { useEffect, useState } from "react";
import styles from "./hostProfile.module.css";
import axios from "axios";

interface OwnerStats {
  totalHomes: number;
  totalReviews: number;
  averageRating: number;
  owner: {
    username: string;
    companyName: string;
    companyDescription: string;
  };
}

interface HostProfileProps {
  homeId: string;
  profilePicture: string;
  work: string;
  languages: string;
  description: string;
  hostName: string;
  hostPicture: string;
  responseRate: string;
  responseTime: string;
}

const HostProfile: React.FC<HostProfileProps> = ({
  homeId,
  profilePicture,
  work,
  languages,
  description,
  hostName,
  hostPicture,
  responseRate,
  responseTime,
}) => {
  const [ownerStats, setOwnerStats] = useState<OwnerStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const API_URL = "http://localhost:5000/api/home-owner-stats/home-owner-stats";

  useEffect(() => {
    const fetchOwnerStats = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/${homeId}`);
        setOwnerStats(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch owner stats");
        setLoading(false);
        console.error(err);
      }
    };

    if (homeId) {
      fetchOwnerStats();
    }
  }, [homeId]);

  if (loading) {
    return <div>Loading host profile...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!ownerStats) {
    return <div>No owner data available.</div>;
  }

  return (
    <div className={styles.hostContainer}>
      <div className={styles.hostProfileCard}>
        <div className={styles.hostProfile}>
          <img
            src={profilePicture}
            alt="Host Profile"
            className={styles.hostImage}
          />
          <h2>{ownerStats.owner.companyName}</h2>
          <div className={styles.superhost}>Superhost</div>
        </div>
        <div className={styles.hostInfo}>
          <ul className={styles.hostStats}>
            <li><span>{ownerStats.totalReviews}</span><br /> Reviews</li>
            <li><span>{ownerStats.averageRating.toFixed(1)} ★</span><br />Rating</li>
            <li><span>{ownerStats.totalHomes}</span><br />Homes hosting</li>
          </ul>
        </div>
      </div>
      <div className={styles.hostDetails}>
        <p className={styles.description}>The rating is based on the ratings of all homes managed by the same host.</p>
        <p>
          <strong>Speaks:</strong> {languages}
        </p>
        <p className={styles.description}>{ownerStats.owner.companyDescription || description}</p>
      </div>
      <div className={styles.additionalInfo}>
        <h3>Co-hosts</h3>
        <div className={styles.coHost}>
          <img
            src={hostPicture}
            alt="Co-host"
            className={styles.coHostImage}
          />
          <p>{ownerStats.owner.username}</p>
        </div>
        <h3>Host details</h3>
        <p>Response rate: {responseRate}</p>
        <p>Responds {responseTime}</p>
      </div>
    </div>
  );
};

export default HostProfile;
