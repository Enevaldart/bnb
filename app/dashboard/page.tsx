"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./dashboard.module.css";

interface Booking {
  _id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  checkInDate: string;
  checkOutDate: string;
  homeName: string;
  totalPrice: number;
  bookingTime: string;
  homeId: string;
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/booking/summary"
        );
        setBookings(response.data);
      } catch (err) {
        setError("Failed to load bookings.");
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bookings List</h1>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.headerCell}>Time of Booking</th>
              <th className={styles.headerCell}>Client Name</th>
              <th className={styles.headerCell}>Hotel Name</th>
              <th className={styles.headerCell}>Check-in Date</th>
              <th className={styles.headerCell}>Check-out Date</th>
              <th className={styles.headerCell}>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={booking._id}
                className={`${styles.tableRow} ${
                  index % 2 === 0 ? styles.evenRow : styles.oddRow
                }`}
              >
                <td className={styles.cell}>
                  {new Date(booking.bookingTime).toLocaleString()}
                </td>
                <td className={styles.cell}>{booking.clientName} <br /> {booking.clientPhone}</td>
                <td className={styles.cell}>{booking.homeName} <br /> <a href={`../homes/${booking.homeId}`}>{booking.homeId}</a></td>
                <td className={styles.cell}>
                  {new Date(booking.checkInDate).toLocaleDateString()}
                </td>
                <td className={styles.cell}>
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </td>
                <td className={`${styles.cell} ${styles.totalPrice}`}>
                  Ksh {booking.totalPrice.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Bookings;
