import Rules from '@/app/ui/rules';
import Payment from '@/app/ui/payment';
/*import Amenities from '@/app/ui/amenities';*/
import Amenities from '@/app/amenities/amen1';
import "@/app/globals.css";
import Collage from '@/app/ui/collages';
import Assets from '@/app/ui/mainAssets';
import React, { useState } from 'react';
import { LuBedDouble } from "react-icons/lu";
import { MdWorkspacesOutline } from "react-icons/md";
import { MdOutlineBed } from "react-icons/md";
import CustomCarousel from '@/app/ui/carousel';
import { MdOutlineBedroomParent } from "react-icons/md";

const IndexPage: React.FC = () => {
  // Example array of image URLs
  const images: string[] = [
    '/PalmTerraces/IMG-20240520-WA0036.jpg',
    '/PalmTerraces/IMG-20240520-WA0037.jpg',
    '/PalmTerraces/IMG-20240520-WA0038.jpg',
    '/PalmTerraces/IMG-20240520-WA0039.jpg',
    '/PalmTerraces/IMG-20240520-WA0040.jpg',
    '/PalmTerraces/IMG-20240520-WA0041.jpg',
    '/PalmTerraces/IMG-20240520-WA0042.jpg',
    '/PalmTerraces/IMG-20240520-WA0043.jpg',
    '/PalmTerraces/IMG-20240520-WA0044.jpg',
    '/PalmTerraces/IMG-20240520-WA0045.jpg',
  ];
  
  const name = "2 Bedroom Palm Terraces";
  const NoOfBedroom = "2";
  const NoOfGuests = "6";
  const NoOfBeds = "3";
  const Location = "Nyali";
  const County = "Mombasa";
  const Price = "ksh 4,000";
  const Amenity = "";
  const description = "This is one of the apartments with a swimming pool. It has a very serene environment with lovely views of Mombasa. You will love it.";

  return (
    <div class="home-more">
      <div class="gallery-carousel">
        <CustomCarousel images={images} name= {name} />
      </div>
      <div class="gallery-collage">
        <Collage images={images} name= {name} />
      </div>
      <div class="des">
       <div class="des-sc">
        <h2>{name}, {Location}</h2>
        <Assets guests={NoOfGuests} bedroom={NoOfBedroom} bed={NoOfBeds} bath="2" />
        <hr />
        <h2 class="section-bed">Where you'll sleep</h2>
        <div class="bed">
          <div>
            <MdOutlineBedroomParent />
            <span>Bedrooms</span>
            <span>{NoOfBedroom} bedroom</span>
          </div>
          <div>
            <MdOutlineBed />
            <span>Beds</span>
            <span>{NoOfBeds} bed</span>
          </div>
        </div>
        <hr />
        <Amenities />
       </div>
        <Payment price={Price} description={description} />
     </div>
     <hr />
     <Rules />
    </div>
  );
};

export default IndexPage;
