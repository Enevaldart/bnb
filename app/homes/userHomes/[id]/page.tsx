'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Rules from "@/app/ui/rules";
import Payment from "@/app/ui/payment";
import "@/app/globals.css";
import Collage from "@/app/ui/collages";
import Assets from "@/app/ui/mainAssets";
import { MdOutlineBed, MdOutlineBedroomParent } from "react-icons/md";
import CustomCarousel from "@/app/ui/carousel";
import styles from "./id.module.css";
import { getHomeById, deleteHome } from '@/app/homes/api';

interface Home {
  _id: string;
  rating: string;
  name: string;
  location: string;
  description: string;
  price: string;
  imageUrl?: string[];
  amenities?: string[];
}

const HomePage = ({ params }: { params: { id: string } }) => {
  const [home, setHome] = useState<Home | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const homeData = await getHomeById(params.id);
        setHome(homeData);
      } catch (error) {
        console.error("Error fetching home:", error);
      }
    };
    fetchHome();
  }, [params.id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this home?')) {
      try {
        // Note: You need to implement a way to get the token securely
        const token = 'your-auth-token'; // Replace this with actual token retrieval
        await deleteHome(home!._id, token);
        router.push('/homes');  // Redirect to homes list after successful deletion
      } catch (error) {
        console.error('Error deleting home:', error);
        alert('Failed to delete home. Please try again.');
      }
    }
  };

  if (!home) {
    return <div>Loading...</div>;
  }

  const images: string[] = [
    "/1brNyali/IMG-20240504-WA0025.jpg",
    "/1brNyali/IMG-20240504-WA0026.jpg",
    "/1brNyali/IMG-20240504-WA0028.jpg",
    "/1brNyali/IMG-20240504-WA0030.jpg",
    "/1brNyali/IMG-20240504-WA0033.jpg",
    "/1brNyali/IMG-20240504-WA0031.jpg",
    "/1brNyali/IMG-20240504-WA0032.jpg",
  ];

  const NoOfBedroom = "1";
  const NoOfGuests = "2";
  const NoOfBeds = "1";

  return (
    <div className="home-more">
      <div className="gallery-carousel">
        <CustomCarousel images={images} name={home.name} />
      </div>
      <div className="gallery-collage">
        <Collage images={images} name={home.name} />
      </div>
      <div className="des">
        <div className="des-sc">
          <h2>
            {home.name}, {home.location}
          </h2>
          <Assets
            guests={NoOfGuests}
            bedroom={NoOfBedroom}
            bed={NoOfBeds}
            bath="2"
          />
          <hr />
          <h2 className="section-bed">Where you'll sleep</h2>
          <div className="bed">
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
          <div className="amenities-list">
            <h3>Amenities</h3>
            <ul>
              {home.amenities?.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.paymn}>
          <Payment price={home.price} description={home.description} />
          <div className={styles.btn}>
            <a href={`/homes/update/${home._id}`}>Update home</a>
            <button onClick={handleDelete}>Delete home</button>
          </div>
        </div>
      </div>
      <hr />
      <Rules />
    </div>
  );
};

export default HomePage;