"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ErrorMessage from "@/app/ui/errorMessage";
import styles from "./payment.module.css";
import { deleteHome } from "@/app/homes/api";

interface CardProps {
  price: string;
  description: string;
  homeId: string;
}

const Payment: React.FC<CardProps> = ({ price, description, homeId }) => {
  const pricePerNight = parseFloat(price);
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [nights, setNights] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [convenienceFee, setConvenienceFee] = useState<number>(0);
  const [finalTotal, setFinalTotal] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"info" | "warning" | "error">("info");
  const [key, setKey] = useState(0);

  // Additional form state for client details
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);

  // Function to set default dates on component mount
  useEffect(() => {
    const today = new Date();
    const todayDateString = today.toISOString().split("T")[0]; // Today's date
    const checkOutDate = new Date(today);
    checkOutDate.setDate(today.getDate() + 5); // Check-out 5 days later
    const checkOutDateString = checkOutDate.toISOString().split("T")[0];

    setCheckIn(todayDateString); // Set default check-in date
    setCheckOut(checkOutDateString); // Set default check-out date
  }, []);

  const handleError = (type: "info" | "warning" | "error") => {
    setMessage(
      "Online reservation is not available at the moment! Please contact +254115 425 094 on WhatsApp to complete your room reservation. Thank you"
    );
    setType(type);
    setKey((prevKey) => prevKey + 1);
  };

  const handleCheckInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckIn(event.target.value);
  };

  const handleCheckOutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckOut(event.target.value);
  };

  const handleCheckReservation = (e: React.MouseEvent) => {
    e.preventDefault();
    if (checkIn && checkOut) {
      setDrawerOpen(true);
    }
  };

  useEffect(() => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const differenceInTime = checkOutDate.getTime() - checkInDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      setNights(differenceInDays > 0 ? differenceInDays : null);
    } else {
      setNights(null);
    }
  }, [checkIn, checkOut]);

  useEffect(() => {
    if (nights !== null) {
      const baseTotal = nights * pricePerNight;
      setTotalAmount(baseTotal);
      const fee = baseTotal * 0.04;
      setConvenienceFee(fee);
      setFinalTotal(baseTotal + fee);
    } else {
      setTotalAmount(0);
      setConvenienceFee(0);
      setFinalTotal(0);
    }
  }, [nights, pricePerNight]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bookingData = {
      clientName,
      clientEmail,
      clientPhone,
      checkIn,
      checkOut,
      totalPrice: finalTotal,
      nights,
      homeId,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/booking",
        bookingData
      );
      console.log(response.data);
      setClientName("");
      setClientEmail("");
      setClientPhone("");
      setCheckIn("");
      setCheckOut("");
      setNights(null);
      setDrawerOpen(false);
    } catch (error) {
      console.error(error);
      handleError("error");
    }
  };

  return (
    <div className={styles.check}>
      <div className={styles.cheque}>
        <p>
          Ksh{price} <span>night</span>
        </p>
        <form action="">
          <div className="grid grid-cols-2 grid-rows-2">
            <div className={styles.form}>
              <div className="date col-span-1 row-span-1">
                <label>Check-in</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={handleCheckInChange}
                />
              </div>
              <div className="date col-span-1 row-span-1">
                <label>Checkout</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={handleCheckOutChange}
                />
              </div>
              <div className="col-span-2 row-span-1">
                <label>Guests</label>
                <input type="text" value="1 Guest" readOnly />
              </div>
            </div>

            {nights !== null && (
              <div className={styles.pay}>
                <li>
                  <i>
                    {nights} night{nights > 1 ? "s" : ""} selected
                  </i>
                </li>
                <li>
                  Basic: {pricePerNight} * {nights} = Ksh{" "}
                  {totalAmount.toFixed(2)}
                </li>
                <li>Convenience Fee (4%): Ksh {convenienceFee.toFixed(2)}</li>
                <li>
                  <strong>Total Amount: Ksh {finalTotal.toFixed(2)}</strong>
                </li>
              </div>
            )}

            {nights === null && checkIn && checkOut && (
              <span>Those dates are not available</span>
            )}

            <button
              onClick={handleCheckReservation}
              disabled={!nights}
            >
              Check reservation
            </button>
          </div>
        </form>
      </div>
      <div className={styles.story}>{description}</div>

      <ErrorMessage key={key} message={message} type={type} />

      <div
        className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ""}`}
      >
        <h3>Enter Client Details</h3>
        <form onSubmit={handleBookingSubmit}>
          <div className={styles.drawerField}>
            <label>Name</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Your Name"
              required
            />
          </div>
          <div className={styles.drawerField}>
            <label>Email</label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="Your Email"
              required
            />
          </div>
          <div className={styles.drawerField}>
            <label>Phone</label>
            <input
              type="tel"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              placeholder="Your Phone"
              required
            />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Complete Booking
          </button>
          <div className={styles.pay}>
            <li>
              <i>
                {nights} night{nights > 1 ? "s" : ""} selected
              </i>
            </li>
            <li>
              Basic: {pricePerNight} * {nights} = Ksh {totalAmount.toFixed(2)}
            </li>
            <li>Convenience Fee (4%): Ksh {convenienceFee.toFixed(2)}</li>
            <li>
              <strong>Total Amount: Ksh {finalTotal.toFixed(2)}</strong>
            </li>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
