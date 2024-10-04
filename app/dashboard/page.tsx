"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./dashboard.module.css";
import { FaEnvelope } from "react-icons/fa";

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
  const [sendingReview, setSendingReview] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/booking/summary"
        );

        // Sort bookings by bookingTime in descending order (most recent first)
        const sortedBookings = response.data.sort(
          (a: Booking, b: Booking) =>
            new Date(b.bookingTime).getTime() -
            new Date(a.bookingTime).getTime()
        );

        setBookings(sortedBookings);
      } catch (err) {
        setError("Failed to load bookings.");
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  // Function to handle sending review link
  const sendReviewLink = async (bookingId: string) => {
    setSendingReview(bookingId); // Set sending state
    try {
      const response = await axios.post(
        `http://localhost:5000/api/booking/send-review-link/${bookingId}`
      );
      alert("Review link sent successfully!");
    } catch (err) {
      console.error("Error sending review link:", err);
      alert("Failed to send review link.");
    } finally {
      setSendingReview(null);
    }
  };

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
                <th className={styles.headerCell}>Time of Booking</th>
                <th className={styles.headerCell}>Client Name</th>
                <th className={styles.headerCell}>Hotel Name</th>
                <th className={styles.headerCell}>Check-in Date</th>
                <th className={styles.headerCell}>Check-out Date</th>
                <th className={styles.headerCell}>Total Price</th>
                <th className={styles.headerCell}>Actions</th>{" "}
                {/* Add actions header */}
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
                  <td className={styles.cell}>
                    {booking.clientName} <br /> {booking.clientPhone}
                  </td>
                  <td className={styles.cell}>
                    {booking.homeName} <br />{" "}
                    <a href={`../homes/${booking.homeId}`}>{booking.homeId}</a>
                  </td>
                  <td className={styles.cell}>
                    {new Date(booking.checkInDate).toLocaleDateString()}
                  </td>
                  <td className={styles.cell}>
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                  </td>
                  <td className={`${styles.cell} ${styles.totalPrice}`}>
                    Ksh {booking.totalPrice.toFixed(2)}
                  </td>
                  <td className={styles.cell}>
                    {/* Email Icon to send review link */}
                    <button
                      className={styles.sendReviewButton}
                      onClick={() => sendReviewLink(booking._id)}
                      disabled={sendingReview === booking._id} // Disable button while sending
                    >
                      {sendingReview === booking._id ? (
                        "Sending..."
                      ) : (
                        <FaEnvelope />
                      )}
                    </button>
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

export default Bookings;
