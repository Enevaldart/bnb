"use client";

// components/Card.tsx
import "../globals.css";

import React,  { useState } from 'react';
import CustomCarousel from '@/app/ui/carousel';

interface CardProps {
  guests: string;
  bedroom: string;
  bed: string;
  bath: string;
}

const Assets: React.FC<CardProps> = ({ guests, bedroom, bed, bath }) => {
  return (
    <>
    <ul className="assets">
        <li>{bedroom} Bedroom</li>
        <li>{bed}</li>
        <li>{guests} Guests</li>
      </ul>
    </>
  );
};

export default Assets;
