"use client";

import "../globals.css";
import React, { useState, useEffect } from 'react';
import ErrorMessage from '@/app/ui/errorMessage';

interface CardProps {
  price: string;
  description: string;
}

const Payment: React.FC<CardProps> = ({ price, description }) => {
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [nights, setNights] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'info' | 'warning' | 'error'>('info');
  const [key, setKey] = useState(0);

  const handleError = (type: 'info' | 'warning' | 'error') => {
    setMessage('Online reservation is not available at the moment! Please contact +254115 425 094 on WhatsApp to complete your room reservation. Thank you');
    setType(type);
    setKey(prevKey => prevKey + 1); // Update key to force re-render
  };

  const handleCheckInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckIn(event.target.value);
  };

  const handleCheckOutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckOut(event.target.value);
  };

  useEffect(() => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const differenceInTime = checkOutDate.getTime() - checkInDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      setNights(differenceInDays > 0 ? differenceInDays : null); // Set nights or null if invalid
    } else {
      setNights(null); // Reset nights if dates are not set
    }
  }, [checkIn, checkOut]);

  return (
    <div className="check-rt">
      <div className="check">
        <p>Ksh {price}/=<span>night </span></p>
        <form action="" className="grid grid-cols-2 grid-rows-2">
          <div className="date col-span-1 row-span-1">
            <label>Check-in</label>
            <input type="date" value={checkIn} onChange={handleCheckInChange} />
          </div>
          <div className="date col-span-1 row-span-1">
            <label>Checkout</label>
            <input type="date" value={checkOut} onChange={handleCheckOutChange} />
          </div>
          <div className="col-span-2 row-span-1">
            <label>Guests</label>
            <input type="text" value="1 Guest" readOnly />
          </div>
        </form>
        {nights !== null && (
          <p>{nights} night{nights > 1 ? 's' : ''} selected.</p>
        )}
        
        {nights === null && checkIn && checkOut && (
          <span>Those dates are not available</span>
        )}
        <button onClick={() => handleError('info')}>Check reservation</button>
      </div>
      <div className="story">
        {description}
      </div>
      <ErrorMessage key={key} message={message} type={type} />
    </div>
  );
};

export default Payment;
