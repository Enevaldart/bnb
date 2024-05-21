"use client"; 

import "../globals.css";
import React, { useState } from 'react';
import Grid from '@/app/ui/grid';

interface CollageProps {
  images: string[];
  name: string;
}

const Collage = ({ images, name }) => {
  const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
    setShowComponent(!showComponent);
  };

  const handleIconClick = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the parent div
    setShowComponent(false); // Hide the component
  };

  return (
  <div>
   <h1>{name}</h1>
    <div onClick={handleClick} id="pc" style={{ cursor: 'pointer' }} class="collage" className="collage grid grid-cols-2 grid-rows-4 gap-3">
      {/* First row */}
      <div className="col-span-2 row-span-2">
        <img src={images[0]} alt="Image 1" className="w-full h-full object-cover" />
      </div>
      <div className="col-span-1 row-span-1">
        <img src={images[1]} alt="Image 2" className="w-full h-full object-cover" />
      </div>
      <div className="col-span-1 row-span-1">
        <img src={images[2]} alt="Image 3" className="w-full h-full object-cover" />
      </div>
      {/* Second row */}
      <div className="col-span-1 row-span-1">
        <img src={images[3]} alt="Image 4" className="w-full h-full object-cover" />
      </div>
      <div className="col-span-1 row-span-1">
        <img src={images[4]} alt="Image 5" className="w-full h-full object-cover" />
      </div>
    </div>
    <div onClick={handleClick} id="tablet" style={{ cursor: 'pointer' }} class="collage" className="collage grid grid-cols-2 grid-rows-3 gap-3">
      {/* First row */}
      <div className="col-span-2 row-span-2">
        <img src={images[0]} alt="Image 1" className="w-full h-full object-cover" />
      </div>
      <div className="col-span-1 row-span-1">
        <img src={images[1]} alt="Image 2" className="w-full h-full object-cover" />
      </div>
      {/* Second row */}
      <div className="col-span-1 row-span-1">
        <img src={images[4]} alt="Image 5" className="w-full h-full object-cover" />
      </div>
    </div>
    {showComponent && <div>
      <span class="togg" onClick={handleIconClick} style={{ cursor: 'pointer' }}>
            Back {name}
      </span>
      <Grid images={images} /></div>}
    </div>
  );
};

export default Collage;
