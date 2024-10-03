"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./myHomes.module.css";
import { getUserHomes, searchHomes } from "@/app/homes/api";

interface Home {
  _id: string;
  name: string;
  location: string;
  price: number;
  imageUrl: string[];
  rating: number;
  bedrooms: number;
  beds: number;
}

const MyHomes = () => {
  const [homes, setHomes] = useState<Home[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserHomes() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }
        const data = await getUserHomes(token);
        setHomes(data);
      } catch (err) {
        setError("Failed to fetch homes. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchUserHomes();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.container}>
    <h1 className={styles.title}>Bookings List</h1>
    {error ? (
      <p className={styles.error}>{error}</p>
    ) : (
      <div className={styles.scrollable}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.headerCell}>Home Name</th>
              <th className={styles.headerCell}>Location</th>
              <th className={styles.headerCell}>Price/night</th>
              <th className={styles.headerCell}>Bedrooms</th>
              <th className={styles.headerCell}>beds</th>
              <th className={styles.headerCell}>Rating</th>
            </tr>
          </thead>
          <tbody>
          {homes.map((home, index) => (
              <tr
                key={home._id}
                className={`${styles.tableRow} ${
                  index % 2 === 0 ? styles.evenRow : styles.oddRow
                }`}
              >
                <td className={styles.cell}>
                {home.name}
                </td>
                <td className={styles.cell}>
                {home.location}
                </td>
                <td className={styles.cell}>
                {home.price}
                </td>
                <td className={styles.cell}>
                {home.bedrooms}
                </td>
                <td className={styles.cell}>
                {home.beds}
                </td>
                <td className={`${styles.cell} ${styles.totalPrice}`}>
                {home.rating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  );
};

export default MyHomes;
