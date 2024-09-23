"use client";

// components/Card.tsx
import "../globals.css";
import { GoStarFill } from "react-icons/go";

import React,  { useState } from 'react';
import CustomCarousel from '@/app/ui/carousel';

interface CardProps {
  imageUrl?: string;
  rate: string;
  hrefLink: string;
  price: string;
  region: string;
  specific: string;
  county: string;
}

const Card: React.FC<CardProps> = ({ county, hrefLink, specific, region, price, rate, imageUrl }) => {
  const imageSrc = imageUrl ? `http://localhost:5000${imageUrl}` : '';
  return (
    <div className="card bg-white rounded-lg overflow-hidden shadow-md">
      <a href={hrefLink} target="blank">
      {imageUrl && (
        <img className="w-full h-40 object-cover" src={imageSrc} alt={county} />
      )}
      <div className="desc">
        <h2>{county}</h2><p className="tit"><i><GoStarFill /></i>{rate}</p>
        <p className="p">{region}</p>
        <p className="p">{specific}</p>
        <p className="price">Ksh {price}<span>night</span></p>
      </div>
      </a>
    </div>
  );
};

export default Card;
