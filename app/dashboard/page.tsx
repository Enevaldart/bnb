"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";


interface Booking {
  _id: string;
  clientName: string;
  checkInDate: string;
  checkOutDate: string;
  homeName: string;
  totalPrice: number;
  bookingTime: string;
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/booking/summary");
        setBookings(response.data);
      } catch (err) {
        setError("Failed to load bookings.");
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h1>Bookings List</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Time of Booking</th>
              <th>Client Name</th>
              <th>Hotel Name</th>
              <th>Check-in Date</th>
              <th>Check-out Date</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{new Date(booking.bookingTime).toLocaleString()}</td>
                <td>{booking.clientName}</td>
                <td>{booking.homeName}</td>
                <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                <td>Ksh {booking.totalPrice.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Bookings;
