"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./dashboard.module.css";

interface Booking {
  _id: string;
  home: {
    _id: string;
    name: string;
  };
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  createdAt: string;
  reviewLink?: string;
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sendingReview, setSendingReview] = useState<string | null>(null);
  const [creatingReview, setCreatingReview] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get<Booking[]>(
        "http://localhost:5000/api/booking"
      );

      const sortedBookings = response.data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setBookings(sortedBookings);
    } catch (err) {
      setError("Failed to load bookings.");
      console.error(err);
    }
  };

  const sendReviewLink = async (bookingId: string) => {
    console.log("Sending review link for Booking ID:", bookingId);

    if (!bookingId) {
      console.log("Booking ID is missing!");
      return;
    }

    setSendingReview(bookingId);
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

  const createReviewLink = async (bookingId: string) => {
    console.log("Creating review link for Booking ID:", bookingId);

    if (!bookingId) {
      console.log("Booking ID is missing!");
      return;
    }

    setCreatingReview(bookingId);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/booking/create-review-link/${bookingId}`
      );
      alert("Review link created successfully!");
      fetchBookings(); // Refresh the bookings list
    } catch (err) {
      console.error("Error creating review link:", err);
      alert("Failed to create review link.");
    } finally {
      setCreatingReview(null);
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
                <th className={styles.headerCell}>Actions</th>
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
                    {new Date(booking.createdAt).toLocaleString()}
                  </td>
                  <td className={styles.cell}>
                    {booking.clientName} <br /> {booking.clientPhone}
                  </td>
                  <td className={styles.cell}>
                    {booking.home.name} <br />
                    <a href={`../homes/${booking.home._id}`}>{booking.home._id}</a>
                  </td>
                  <td className={styles.cell}>
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </td>
                  <td className={styles.cell}>
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </td>
                  <td className={`${styles.cell} ${styles.totalPrice}`}>
                    Ksh {booking.totalPrice.toFixed(2)}
                  </td>
                  <td className={styles.cell}>
                    {booking.reviewLink ? (
                      <button
                        className={styles.sendReviewButton}
                        onClick={() => sendReviewLink(booking._id)}
                        disabled={sendingReview === booking._id}
                      >
                        {sendingReview === booking._id
                          ? "Sending..."
                          : "Send Review Link"}
                      </button>
                    ) : (
                      <button
                        className={styles.createReviewButton}
                        onClick={() => createReviewLink(booking._id)}
                        disabled={creatingReview === booking._id}
                      >
                        {creatingReview === booking._id
                          ? "Creating..."
                          : "Create Review Link"}
                      </button>
                    )}
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